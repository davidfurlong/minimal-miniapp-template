import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

export function encrypt(data: { fid: number }): string {
  return jwt.sign(data, process.env.JWT_SECRET!, {
    expiresIn: "3000h",
  });
}

export function decrypt(token: string): { fid: number } {
  return jwt.verify(token, process.env.JWT_SECRET!) as { fid: number };
}
