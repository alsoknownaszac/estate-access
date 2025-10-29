// Mock authentication service
export interface AuthUser {
  email: string;
  name: string;
}

const MOCK_CREDENTIALS = {
  email: "admin@estate.com",
  password: "password123",
};

export const mockLogin = (email: string, password: string): AuthUser | null => {
  if (
    email === MOCK_CREDENTIALS.email &&
    password === MOCK_CREDENTIALS.password
  ) {
    return {
      email,
      name: "Admin User",
    };
  }
  return null;
};
