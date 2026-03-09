import posthog from 'posthog-js'

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    posthog.init('phc_nd3hkeygkxbcwMXgTKCLWCRlVXqYzOt7dbT2KsIhbM9', {
      api_host: 'https://eu.i.posthog.com',
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
