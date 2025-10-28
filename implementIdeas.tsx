export class NovaCRMAPI {
  private baseUrl: string
  private apiKey?: string

  constructor(baseUrl = "", apiKey?: string) {
    this.baseUrl = baseUrl || (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000")
    this.apiKey = apiKey
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.apiKey) {
      headers["x-api-key"] = this.apiKey
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Unknown error" }))
        throw new Error(error.error || "API request failed")
      }

      return response.json()
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      throw error
    }
  }

  // Authentication
  async login(email: string, password: string) {
    return this.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async register(userData: {
    email: string
    password: string
    name: string
    role?: string
    department?: string
  }) {
    return this.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  // Projects
  async getProjects(params?: {
    page?: number
    limit?: number
    status?: string
    priority?: string
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    return this.request(`/api/projects?${searchParams}`)
  }

  async createProject(projectData: {
    name: string
    description?: string
    status?: string
    priority?: string
    budget?: number
    due_date?: string
    created_by: string
  }) {
    return this.request("/api/projects", {
      method: "POST",
      body: JSON.stringify(projectData),
    })
  }

  async updateProject(id: string, projectData: any) {
    return this.request(`/api/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(projectData),
    })
  }

  async deleteProject(id: string) {
    return this.request(`/api/projects/${id}`, {
      method: "DELETE",
    })
  }

  // Employees
  async getEmployees(params?: {
    page?: number
    limit?: number
    department?: string
    status?: string
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    return this.request(`/api/employees?${searchParams}`)
  }

  // URL Shortener
  async shortenUrl(urlData: {
    original_url: string
    custom_alias?: string
    title?: string
    description?: string
    user_id?: string
    expires_at?: string
    password?: string
  }) {
    return this.request("/api/url-shortener/shorten", {
      method: "POST",
      body: JSON.stringify(urlData),
    })
  }

  async bulkShortenUrls(urls: any[], user_id?: string) {
    return this.request("/api/url-shortener/bulk", {
      method: "POST",
      body: JSON.stringify({ urls, user_id }),
    })
  }

  async getUrlAnalytics(code: string, days = 30) {
    return this.request(`/api/url-shortener/analytics/${code}?days=${days}`)
  }

  // API Keys
  async getApiKeys(user_id: string) {
    return this.request(`/api/api-keys?user_id=${user_id}`)
  }

  async createApiKey(keyData: {
    user_id: string
    key_name: string
    permissions?: string[]
    rate_limit?: number
    expires_at?: string
  }) {
    return this.request("/api/api-keys", {
      method: "POST",
      body: JSON.stringify(keyData),
    })
  }
}

// Usage example
export const apiClient = new NovaCRMAPI()
