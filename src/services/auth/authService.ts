import { api } from '../api';
import { User } from '../models/user';
import { SignInCredentials, AuthResponse } from './authService.d';

export async function auth({ email, password }: SignInCredentials) {
  return api.post<AuthResponse>('auth/login', { email, password });
}
