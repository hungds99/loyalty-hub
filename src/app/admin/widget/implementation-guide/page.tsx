export default function ImplementationGuidePage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Loyalty Widget Implementation Guide</h1>

      <div className="prose max-w-none">
        <h2>Getting Started</h2>
        <p>
          The RewardHub Loyalty Widget allows your customers to interact with your loyalty program directly from your
          website. Follow these steps to implement the widget on your site.
        </p>

        <h2>Step 1: Configure Your Widget</h2>
        <p>
          Before adding the widget to your site, configure its appearance and behavior in the
          <a href="/admin/widget"> Widget Settings</a> page. You can customize colors, text, position, and features.
        </p>

        <h2>Step 2: Add the Widget Code</h2>
        <p>
          Copy the embed code from the Widget Settings page and paste it just before the closing{" "}
          <code>&lt;/body&gt;</code> tag on every page where you want the widget to appear.
        </p>

        <div className="bg-gray-100 p-4 rounded-md my-4">
          <pre className="text-sm overflow-x-auto">
            {`<script>
  (function(w,d,s,o,f,js,fjs){
    w['RewardHubWidget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','rewardhub','https://widget.rewardhub.com/loader.js'));
  rewardhub('init', 'YOUR_CLIENT_ID');
</script>`}
          </pre>
        </div>

        <h2>Step 3: Identify Your Users (Optional)</h2>
        <p>
          If you want to display personalized content to logged-in users, you can identify them using the following
          code:
        </p>

        <div className="bg-gray-100 p-4 rounded-md my-4">
          <pre className="text-sm overflow-x-auto">
            {`<script>
  rewardhub('identify', {
    id: '123',
    email: 'customer@example.com',
    name: 'John Doe',
    points: 750,
    tier: {
      current: 'Bronze',
      next: 'Silver',
      progress: 75,
      pointsToNext: 250
    }
  });
</script>`}
          </pre>
        </div>

        <h2>Step 4: Track Events (Optional)</h2>
        <p>You can track customer actions to award points automatically using the following code:</p>

        <div className="bg-gray-100 p-4 rounded-md my-4">
          <pre className="text-sm overflow-x-auto">
            {`<script>
  // Track a purchase
  rewardhub('track', {
    event: 'purchase',
    properties: {
      orderId: '12345',
      total: 49.99,
      currency: 'USD'
    }
  });
  
  // Track a page view
  rewardhub('track', {
    event: 'pageview',
    properties: {
      url: window.location.href,
      title: document.title
    }
  });
</script>`}
          </pre>
        </div>

        <h2>Advanced Configuration</h2>

        <h3>Controlling Widget Visibility</h3>
        <p>You can programmatically show or hide the widget:</p>

        <div className="bg-gray-100 p-4 rounded-md my-4">
          <pre className="text-sm overflow-x-auto">
            {`// Hide the widget
rewardhub('hide');

// Show the widget
rewardhub('show');`}
          </pre>
        </div>

        <h3>E-commerce Platform Integration</h3>

        <h4>Shopify</h4>
        <p>For Shopify stores, add the widget code to your theme.liquid file just before the closing body tag:</p>

        <div className="bg-gray-100 p-4 rounded-md my-4">
          <pre className="text-sm overflow-x-auto">
            {`{% comment %}RewardHub Loyalty Widget{% endcomment %}
<script>
  (function(w,d,s,o,f,js,fjs){
    w['RewardHubWidget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','rewardhub','https://widget.rewardhub.com/loader.js'));
  rewardhub('init', 'YOUR_CLIENT_ID');
  
  {% if customer %}
    rewardhub('identify', {
      id: '{{ customer.id }}',
      email: '{{ customer.email }}',
      name: '{{ customer.name }}',
      // You'll need to use metafields or an API call to get points and tier info
    });
  {% endif %}
</script>`}
          </pre>
        </div>

        <h4>WooCommerce</h4>
        <p>For WooCommerce stores, add the widget code to your theme's footer.php file:</p>

        <div className="bg-gray-100 p-4 rounded-md my-4">
          <pre className="text-sm overflow-x-auto">
            {`<?php
// RewardHub Loyalty Widget
?>
<script>
  (function(w,d,s,o,f,js,fjs){
    w['RewardHubWidget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','rewardhub','https://widget.rewardhub.com/loader.js'));
  rewardhub('init', 'YOUR_CLIENT_ID');
  
  <?php if (is_user_logged_in()): ?>
    <?php
      $current_user = wp_get_current_user();
      // You'll need to use custom user meta or an API call to get points and tier info
    ?>
    rewardhub('identify', {
      id: '<?php echo $current_user->ID; ?>',
      email: '<?php echo $current_user->user_email; ?>',
      name: '<?php echo $current_user->display_name; ?>',
      // Add points and tier info here
    });
  <?php endif; ?>
</script>`}
          </pre>
        </div>

        <h2>Testing Your Widget</h2>
        <p>After adding the widget to your site, test it by:</p>
        <ol>
          <li>Visiting your website in an incognito/private browsing window</li>
          <li>Checking that the widget appears in the correct position</li>
          <li>Testing the widget on both desktop and mobile devices</li>
          <li>Signing in (if you've implemented user identification)</li>
          <li>Verifying that all features work as expected</li>
        </ol>

        <h2>Need Help?</h2>
        <p>
          If you encounter any issues implementing the widget, please contact our support team at
          <a href="mailto:support@rewardhub.com">support@rewardhub.com</a>.
        </p>
      </div>
    </div>
  )
}

