import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client only if environment variables are available
let supabase: ReturnType<typeof createClient> | null = null

try {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey)
  } else {
    console.warn("Supabase credentials missing. Database functionality will be limited.")
  }
} catch (error) {
  console.error("Failed to initialize Supabase client:", error)
}

// Safe Supabase client that won't throw errors in preview mode
export const getSupabase = () => {
  if (!supabase) {
    // Return a mock client for preview mode
    return {
      from: () => ({
        select: () => ({ data: null, error: new Error("Supabase not initialized") }),
        insert: () => ({ data: null, error: new Error("Supabase not initialized") }),
        update: () => ({ data: null, error: new Error("Supabase not initialized") }),
        delete: () => ({ data: null, error: new Error("Supabase not initialized") }),
        eq: () => ({ data: null, error: new Error("Supabase not initialized") }),
      }),
      auth: {
        signInWithPassword: () => ({ data: null, error: new Error("Supabase not initialized") }),
        signUp: () => ({ data: null, error: new Error("Supabase not initialized") }),
      },
    }
  }
  return supabase
}

// Database Types
export interface User {
  id: string
  email: string
  name: string
  role: string
  department: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  name: string
  description: string
  status: "planning" | "in_progress" | "completed" | "on_hold"
  priority: "low" | "medium" | "high"
  progress: number
  budget: number
  spent: number
  due_date: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface Employee {
  id: string
  user_id: string
  employee_id: string
  role: string
  department: string
  salary: number
  join_date: string
  status: "active" | "on_leave" | "inactive"
  created_at: string
  updated_at: string
}

export interface Invoice {
  id: string
  invoice_number: string
  client_name: string
  amount: number
  issue_date: string
  due_date: string
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  created_by: string
  created_at: string
  updated_at: string
}

export interface LeaveRequest {
  id: string
  employee_id: string
  leave_type: "annual" | "sick" | "personal" | "maternity" | "paternity"
  start_date: string
  end_date: string
  days: number
  reason: string
  status: "pending" | "approved" | "rejected"
  applied_date: string
  reviewed_by?: string
  reviewed_at?: string
  created_at: string
  updated_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  priority: "low" | "medium" | "high"
  read: boolean
  created_at: string
  updated_at: string
}

// URL Shortener Types
export interface ShortUrl {
  id: string
  original_url: string
  short_code: string
  custom_alias?: string
  title?: string
  description?: string
  user_id?: string
  clicks: number
  is_active: boolean
  expires_at?: string
  password?: string
  created_at: string
  updated_at: string
}

export interface UrlClick {
  id: string
  short_url_id: string
  ip_address: string
  user_agent: string
  referer?: string
  country?: string
  city?: string
  clicked_at: string
}

export interface ApiKey {
  id: string
  user_id: string
  key_name: string
  api_key: string
  permissions: string[]
  rate_limit: number
  is_active: boolean
  last_used_at?: string
  created_at: string
  expires_at?: string
}
