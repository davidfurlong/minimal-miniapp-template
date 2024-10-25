import { decrypt } from "@/lib";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { fid } = decrypt(req.headers.get("Authorization")!) as { fid: string };

  // TODO: store a score or do something else

  return NextResponse.json({ success: true, fid });
}
