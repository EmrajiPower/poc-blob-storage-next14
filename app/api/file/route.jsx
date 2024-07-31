import { NextResponse } from "next/server"; 
import { put } from "@vercel/blob";

export async function POST(req) {
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('filename');

    if (!filename) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    const blob = await put(filename, req.body, {
        access: "public",
    })
    return Response.json(blob);
}