const fallbackUrl = "https://abhishek-agrahari.vercel.app";

function resolveSiteUrl() {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackUrl);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.origin
      : fallbackUrl;
  } catch {
    return fallbackUrl;
  }
}

/** Set NEXT_PUBLIC_SITE_URL to the production domain before building. */
export const siteUrl = resolveSiteUrl();
