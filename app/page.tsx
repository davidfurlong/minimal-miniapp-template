"use server";

import { decrypt } from "@/jwt";

export default async function Page(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const authToken = searchParams?.token as string;

  let fid: number | null = null;

  if (authToken) {
    fid = decrypt(authToken).fid;
  }

  return (
    <div>
      <h1>Miniapp</h1>
      Current Authenticated FID: {fid}
    </div>
  );
}

/**
  * An Example of how to make an authenticated POST request to the server. This should be done in a new client component file that has "use client" at the top.
  *
  * async function refetch() {
  *   if (!authToken) {
  *     return;
  *   }

  *   const { success, fid } = await fetch("/user", {
  *     method: "POST",
  *     headers: {
  *       "Content-Type": "application/json",
  *       Authorization: authToken,
  *     },
  *     body: JSON.stringify({}),
  *   }).then((res) => res.json());

  *   window.alert(`Success: ${success}, FID: ${fid}`);
  * }
  *
  * Then, in /app/user/route.tsx handle the POST request.
  *
  * import { decrypt } from "@/lib";
  * import { NextResponse } from "next/server";
  * 
  * export async function POST(req: Request) {
  *   const { fid } = decrypt(req.headers.get("Authorization")!) as { fid: string };
  *   return NextResponse.json({ success: true, fid });
  * }
  */
