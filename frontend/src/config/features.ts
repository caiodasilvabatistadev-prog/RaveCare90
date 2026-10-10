/**
 * Product feature flags for the frontend preview.
 * Anvisa guide code/routes stay in the repo; visibility is off until product wants it live.
 */
export const features = {
  /** When false, hide Anvisa nav/CTAs/landing section. Route may still exist for direct URL. */
  showAnvisaGuide: false,
} as const
