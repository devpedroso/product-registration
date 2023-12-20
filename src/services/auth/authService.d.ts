export type SignInCredentials = {
  email: string;
  password: string;
};

export type AuthResponse = {
  access_token: string;
};

export type JWTDecode = {
  active: boolean;
  cpf: string;
  email: string;
  exp: number;
  fullName: string;
  iat: number;
  id: number;
  phoneNumber: string;
};
