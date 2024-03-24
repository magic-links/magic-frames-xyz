import { headers } from "next/headers";

export function currentURL(pathname: string): URL {
  const headersList = headers();
  const host = headersList.get("x-forwarded-host") || headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const url = new URL(pathname, `${protocol}://${host}`); 

  console.log('currentUrl', url)
  return url
}
export function vercelURL() {
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined;
}
