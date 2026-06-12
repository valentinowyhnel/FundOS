import { SignJWT, jwtVerify } from 'jose';

export interface JwtPayload {
  sub: string;         // userId
  role: 'investor' | 'founder' | 'admin';
  investorId?: string; // si role === 'investor'
  founderId?: string;  // si role === 'founder'
  iat: number;
  exp: number;
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret-change-me');

export async function signJwt(payload: Omit<JwtPayload, 'iat' | 'exp'>): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 7 * 24 * 60 * 60; // 7 days

  return new SignJWT({ ...payload, iat, exp })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(secret);
}

export async function verifyJwt(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, secret);
  return payload as unknown as JwtPayload;
}
