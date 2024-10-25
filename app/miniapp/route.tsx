import { NextResponse } from "next/server";
import { init, validateFramesMessage } from "@airstack/frames";
import { encrypt } from "@/jwt";

if (!process.env.AIRSTACK_API_KEY) {
  throw new Error("AIRSTACK_API_KEY is not set");
}

// init with your airstack api key
init(process.env.AIRSTACK_API_KEY);

const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `http${
      process.env.NEXT_PUBLIC_VERCEL_URL.startsWith("localhost") ? "" : "s"
    }://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "";

// initiate composer action metadata
export function GET() {
  return NextResponse.json({
    type: "composer",
    name: "Miniapp name",
    // supported list: https://docs.farcaster.xyz/reference/actions/spec#valid-icons
    icon: "pencil",
    description: "Miniapp description",
    aboutUrl: VERCEL_URL,
    imageUrl: `${VERCEL_URL}/frame-image.png`,
    action: {
      type: "post",
    },
  });
}

export async function POST(req: Request, res: Response) {
  const { isValid, message } = await validateFramesMessage(await req.json());

  if (!isValid || !message) {
    return NextResponse.json({ message }, { status: 400 });
  }

  const token = encrypt({ fid: message.data.fid });

  return NextResponse.json({
    type: "form",
    title: "Miniapp",
    url: `${VERCEL_URL}?token=${token}`,
  });
}
