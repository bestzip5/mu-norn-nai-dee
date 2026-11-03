import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/safe-next-path";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const nextPath = safeNextPath(request.nextUrl.searchParams.get("next"));
  const errorPath = nextPath === "/update-password" ? "/forgot-password?error=link" : "/login?error=callback";

  if (!code) {
    return NextResponse.redirect(new URL(errorPath, request.url));
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.redirect(new URL("/login?error=configuration", request.url));
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect(new URL(errorPath, request.url));
  }

  return NextResponse.redirect(new URL(nextPath === "/" ? "/login?confirmed=1" : nextPath, request.url));
}
