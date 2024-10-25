"use server";

import { decrypt } from "@/lib";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const authToken = searchParams?.token as string;

  let fid: string | null = null;

  if (authToken) {
    fid = decrypt(authToken).fid;
  }

  // async function refetch() {
  //   if (!authToken) {
  //     return;
  //   }

  //   const { success, fid } = await fetch("/user", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: authToken,
  //     },
  //     body: JSON.stringify({}),
  //   }).then((res) => res.json());

  //   window.alert(`Success: ${success}, FID: ${fid}`);
  // }

  return (
    <div>
      <h1>Miniapp</h1>
      Current Authenticated FID: {fid}
      {/* <button onClick={refetch}>Send Score</button> */}
    </div>
  );
}
