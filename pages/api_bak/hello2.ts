import type { NextApiRequest, NextApiResponse } from "next";

let count = 0;

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const now = new Date(Date.now());
  res
    .status(200)
    .json({ text: "Hello 2", count, serverDate: now.toISOString() });
  count++;
}
