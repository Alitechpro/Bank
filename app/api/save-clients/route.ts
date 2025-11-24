// app/api/save-clients/route.ts
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ clients: [] });

  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const raw = user.publicMetadata.clients;

    if (!raw) return NextResponse.json({ clients: [] });

    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    return NextResponse.json({ clients: parsed });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ clients: [] });
  }
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { clients } = await request.json();

  try {
    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        clients: JSON.stringify(clients),
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
