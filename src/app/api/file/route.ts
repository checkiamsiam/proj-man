//@ts-nocheck
import { NextResponse } from "next/server";

const handler = (req, res) => {
  return NextResponse.json({ name: "File uploaded" });
};

export { handler as POST };
