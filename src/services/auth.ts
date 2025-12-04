// Authentication Service for Flask backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Identifiants incorrects');
  }

  return response.json();
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Erreur lors de l\'inscription');
  }

  return response.json();
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};
