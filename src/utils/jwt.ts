import { sign, verify } from 'jsonwebtoken';

const secret: string | undefined = process.env.JWT_SECRET;

export const JwtUtil = {
  signJwt(id: number, email: string) {
    const payload = {
      id,
      email,
    };

    return sign(payload, secret!, {
      expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      algorithm: 'HS256',
    });
  },

  verifyJwt(token: string) {
    return verify(token, secret!, {
      algorithms: ['HS256'],
    });
  },

  generateRefreshToken(id: string, email: string) {
    const payload = {
      id,
      email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 días
    };

    return sign(payload, secret!, {
      algorithm: 'HS256',
    });
  },
};
