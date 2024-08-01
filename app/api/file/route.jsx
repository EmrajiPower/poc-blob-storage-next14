import { NextResponse } from "next/server"; 
import { list, put, del } from '@vercel/blob';

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

export async function GET() {
    const { blobs } = await list();
    return Response.json({ blobs });
}
 
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const urlToDelete = searchParams.get('url');
  await del(urlToDelete);
 
  return new Response();
}