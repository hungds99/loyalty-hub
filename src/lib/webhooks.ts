import crypto from "crypto"

/**
 * Utility functions for working with webhooks
 */

/**
 * Generate a webhook signature for a payload
 * @param payload The payload to sign
 * @param secret The webhook secret
 * @returns The signature and timestamp
 */
export function generateWebhookSignature(payload: any, secret: string) {
  const timestamp = Math.floor(Date.now() / 1000)
  const payloadString = typeof payload === "string" ? payload : JSON.stringify(payload)
  const signedPayload = `${timestamp}.${payloadString}`
  const signature = crypto.createHmac("sha256", secret).update(signedPayload).digest("hex")

  return {
    signature,
    timestamp,
    signedPayload,
  }
}

/**
 * Verify a webhook signature
 * @param payload The payload that was signed
 * @param signature The signature to verify
 * @param timestamp The timestamp when the signature was created
 * @param secret The webhook secret
 * @returns Whether the signature is valid
 */
export function verifyWebhookSignature(payload: any, signature: string, timestamp: number, secret: string) {
  // Check if the timestamp is too old (15 minutes)
  const now = Math.floor(Date.now() / 1000)
  if (now - timestamp > 15 * 60) {
    return false
  }

  const payloadString = typeof payload === "string" ? payload : JSON.stringify(payload)
  const signedPayload = `${timestamp}.${payloadString}`
  const expectedSignature = crypto.createHmac("sha256", secret).update(signedPayload).digest("hex")

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
}

/**
 * Trigger a webhook for an event
 * @param event The event type
 * @param payload The event payload
 * @param webhooks The webhooks to trigger
 */
export async function triggerWebhooks(event: string, payload: any, webhooks: any[]) {
  // Find all active webhooks that are subscribed to this event
  const eligibleWebhooks = webhooks.filter((webhook) => webhook.active && webhook.events.includes(event))

  // No webhooks to trigger
  if (eligibleWebhooks.length === 0) {
    return []
  }

  // Prepare the webhook payload
  const webhookPayload = {
    event,
    data: payload,
    timestamp: new Date().toISOString(),
  }

  // Send the webhook to each eligible endpoint
  const deliveryPromises = eligibleWebhooks.map(async (webhook) => {
    try {
      // Generate signature
      const { signature, timestamp } = generateWebhookSignature(webhookPayload, webhook.secret)

      // Send the webhook
      const startTime = Date.now()
      const response = await fetch(webhook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Signature": signature,
          "X-Webhook-Timestamp": timestamp.toString(),
          "User-Agent": "RewardHub-Webhook/1.0",
        },
        body: JSON.stringify(webhookPayload),
      })
      const endTime = Date.now()

      // Get response body
      let responseBody
      try {
        responseBody = await response.text()
      } catch (e) {
        responseBody = ""
      }

      // Create log entry
      const log = {
        webhookId: webhook.id,
        webhookName: webhook.name,
        event,
        url: webhook.url,
        status: response.ok ? "success" : "failed",
        statusCode: response.status,
        requestPayload: JSON.stringify(webhookPayload),
        responseBody,
        createdAt: new Date().toISOString(),
        retries: 0,
        duration: endTime - startTime,
      }

      return log
    } catch (error) {
      // Create error log entry
      const log = {
        webhookId: webhook.id,
        webhookName: webhook.name,
        event,
        url: webhook.url,
        status: "failed",
        requestPayload: JSON.stringify(webhookPayload),
        error: error.message || "Unknown error",
        createdAt: new Date().toISOString(),
        retries: 0,
        duration: 0,
      }

      return log
    }
  })

  return Promise.all(deliveryPromises)
}

