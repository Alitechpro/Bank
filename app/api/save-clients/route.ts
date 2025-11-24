// app/api/save-clients/route.ts
import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ clients: [] }, { status: 401 });
  }

  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const clients = user.publicMetadata.clients as string | undefined;
    let parsedClients = [];

    if (clients) {
      try {
        parsedClients = JSON.parse(clients);
      } catch {
        parsedClients = [];
      }
    }

    return NextResponse.json({ clients: parsedClients });
  } catch (error) {
    console.error("Error loading clients:", error);
    return NextResponse.json({ clients: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { clients } = await request.json();

    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        clients: JSON.stringify(clients),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving clients:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
