"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { trackVisitor } from "@/actions/tracking-actions"

export function VisitorTracker() {
  const hasTracked = useRef(false)
  const pathname = usePathname()

  useEffect(() => {
    // Exclude admin/backend routes
    if (
      pathname.startsWith("/dashboard") || 
      pathname.startsWith("/affiliate") || 
      pathname.startsWith("/profile")
    ) {
      return
    }

    // Prevent double tracking in React Strict Mode (dev) or due to re-renders
    if (hasTracked.current) return

    const track = async () => {
      try {
        await trackVisitor()
        hasTracked.current = true
      } catch (error) {
        console.error("Failed to track visitor", error)
      }
    }

    track()
  }, [pathname])

  return null
}
