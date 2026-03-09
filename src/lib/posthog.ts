'use client'
import posthog from 'posthog-js'

export const initPostHog = () => {
  if (typeof window !== 'undefined' && !posthog.__loaded) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
      capture_pageview: false,
      persistence: 'cookie',
      autocapture: true,
      session_recording: {
        maskAllInputs: true,
        maskInputOptions: { password: true }
      }
    })
  }
}

export const trackEvent = (event: string, properties?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    posthog.capture(event, properties)
  }
}

export const identifyUser = (email: string) => {
  if (typeof window !== 'undefined') {
    posthog.identify(email)
  }
}

export const getPostHogId = (): string | null => {
  if (typeof window !== 'undefined') {
    return posthog.get_distinct_id()
  }
  return null
}
