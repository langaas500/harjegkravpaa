'use client'
import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initPostHog, trackEvent } from '@/lib/posthog'

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [initialized, setInitialized] = useState(false)

  // Initialize PostHog only if cookie consent is given
  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (consent === 'accepted') {
      initPostHog()
      setInitialized(true)
    }

    // Listen for consent changes (CookieBanner sets localStorage and we pick it up)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'cookie_consent' && e.newValue === 'accepted') {
        initPostHog()
        setInitialized(true)
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  // Track pageviews on route change
  useEffect(() => {
    if (!initialized) return
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    trackEvent('$pageview', { $current_url: url })
  }, [pathname, searchParams, initialized])

  return <>{children}</>
}
