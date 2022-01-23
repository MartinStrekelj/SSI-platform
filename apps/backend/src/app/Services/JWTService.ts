import * as jwt from 'jsonwebtoken';

const SECRET = process.env.NX_JWT_SECRET;
const JWT_TTL = process.env.NX_JWT_TTL;

interface IResolvedToken {
  did: string;
  time: string;
  iat: number;
  exp: number;
}

export const signJWTToken = (did: string) => {
  const payload = {
    did,
    time: Date(),
  };

  return jwt.sign(payload, SECRET, { expiresIn: JWT_TTL });
};

export const resolveJWTToken = (token: string) => {
  const resolved = jwt.verify(token, SECRET);
  if (!resolved) {
    return false;
  }
  return resolved as IResolvedToken;
};
