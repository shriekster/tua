"use server";

import type { APIEvent } from "@solidjs/start/server";
import { db } from "@/db";

export async function GET({ params }: APIEvent) {
  // const result = await db.select().from("users");
  return { body: "Hello, world!" };
}
