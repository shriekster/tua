import type { APIEvent } from "@solidjs/start/server";
import { db } from "@/db";

export async function GET({ params }: APIEvent) {
  await db.$client.execute("SELECT 1");
  return { body: "Hello, world!" };
}
