"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldCheck } from "lucide-react"

export default function AdminLink() {
  return (
    <Link href="/admin/login" className="fixed bottom-4 right-4 z-50">
      <Button variant="outline" size="sm" className="gap-2">
        <ShieldCheck className="h-4 w-4" />
        Admin
      </Button>
    </Link>
  )
}

