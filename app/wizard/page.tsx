import Link from "next/link";
import { currentURL, vercelURL } from "../utils";
import { createDebugUrl } from "../debug";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";

export async function generateMetadata(): Promise<Metadata> {
  const url = new URL("/wizard/frames", process.env.NEXT_PUBLIC_HOST);
  console.log({ url });
  return {
    title: "New api example",
    description: "This is a new api example",
    other: {
      ...(await fetchMetadata(url)),
    },
  };
}

export default async function Home() {
  const url = currentURL("/wizard");
  console.log(url);
  return (
    <div>
      Multi-page example
      <Link href={createDebugUrl(url)} className="underline">
        Debug
      </Link>
    </div>
  );
}
