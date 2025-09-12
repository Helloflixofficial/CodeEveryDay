import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/database"
import { nanoid } from "nanoid"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const user_id = searchParams.get("user_id")

    if (!user_id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("api_keys")
      .select("id, key_name, permissions, rate_limit, is_active, last_used_at, created_at, expires_at")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user_id, key_name, permissions = [], rate_limit = 1000, expires_at } = body

    if (!user_id || !key_name) {
      return NextResponse.json({ error: "User ID and key name are required" }, { status: 400 })
    }

    // Generate API key
    const api_key = `sk_${nanoid(32)}`

    const { data, error } = await supabase
      .from("api_keys")
      .insert({
        user_id,
        key_name,
        api_key,
        permissions,
        rate_limit,
        expires_at,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
