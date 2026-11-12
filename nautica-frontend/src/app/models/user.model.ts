
export interface User {
  username: string;
  email: string;
  isAdmin: boolean;
  firstname?: string;
  lastname?: string;
  address?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
  message: string;
  isAdmin: boolean;
}
