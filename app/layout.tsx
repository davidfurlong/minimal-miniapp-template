import type { Metadata } from "next";

if (!process.env.NEXT_PUBLIC_VERCEL_URL) {
  throw new Error("NEXT_PUBLIC_VERCEL_URL is not set");
}

const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `http${
      process.env.NEXT_PUBLIC_VERCEL_URL.startsWith("localhost") ? "" : "s"
    }://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "";

export const metadata: Metadata = {
  title: "Miniapp",
  description: "Some description",
  openGraph: {
    title: "Miniapp",
    description: "Some description",
    url: VERCEL_URL,
    siteName: "Miniapp",
    images: [`${VERCEL_URL}/frame-image.png`],
  },
  other: {
    // alternatively, use `fetchMetadata` from `frames.js/next` to fetch a frame from remote
    "fc:frame": "vNext",
    "fc:frame:image": `${VERCEL_URL}/frame-image.png`,
    "fc:frame:button:1": "Open Miniapp",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": `https://warpcast.com/~/composer-action?url=${encodeURIComponent(
      `${VERCEL_URL}/miniapp`
    )}`,
    "fc:frame:post_url": `https://warpcast.com/~/composer-action?url=${encodeURIComponent(
      `${VERCEL_URL}/miniapp`
    )}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
