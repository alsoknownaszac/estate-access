// Mock authentication service
export interface AuthUser {
  email: string
  name: string
}

const MOCK_CREDENTIALS = {
  email: "admin@estate.com",
  password: "password123",
}

export const mockLogin = (email: string, password: string): AuthUser | null => {
  if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
    return {
      email,
      name: "Admin User",
    }
  }
  return null
}

export const getStoredUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem("estate_user")
  return stored ? JSON.parse(stored) : null
}

export const storeUser = (user: AuthUser) => {
  localStorage.setItem("estate_user", JSON.stringify(user))
}

export const clearUser = () => {
  localStorage.removeItem("estate_user")
}
