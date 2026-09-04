import { NextResponse } from "next/server";
import { corsHeaders, handleCorsOptions } from "@/lib/cors";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      serverTime: new Date().toISOString(),
      backend: "Next.js App Router + Supabase PostgreSQL",
    },
    { status: 200, headers: corsHeaders() }
  );
}
