# Ai Market Api


[![CI][build-badge]][build-url]

[![TypeScript][typescript-badge]][typescript-url]

- `npm run docker:dev` 🚀

Este util utiliza el algoritmo de firma de token RS256, que es un algoritmo de clave asimétrica más seguro que HS256. Para utilizar este algoritmo, se necesita una clave pública y una clave privada. La clave pública se puede compartir con los usuarios, mientras que la clave privada debe mantenerse segura.

Los valores de id y email se agregan al payload del token. El valor de exp representa la fecha de expiración del token. En este caso, el token expirará en 30 días.

### RS256
```ts
import { sign, verify } from 'jsonwebtoken';

const secret: string | undefined = process.env.JWT_SECRET;
const publicKey: string | undefined = process.env.JWT_PUBLIC_KEY;


export const jwtUtil = {
  signJwt(id: string, email: string) {
    const payload = {
      id,
      email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 días
    };

    return sign(payload, secret!, {
      algorithm: 'RS256',
    });
  },

  verifyJwt(token: string) {
    return verify(token, publicKey!, {
      algorithms: ['RS256'],
    });
  },

  generateRefreshToken(id: string, email: string) {
    const payload = {
      id,
      email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 días
    };

    return sign(payload, secret!, {
      algorithm: 'RS256',
    });
  },
};
```
[build-badge]: https://github.com/mkosir/express-typescript-typeorm-boilerplate/actions/workflows/main.yml/badge.svg
[build-url]: https://github.com/mkosir/express-typescript-typeorm-boilerplate/actions/workflows/main.yml
[typescript-badge]: https://badges.frapsoft.com/typescript/code/typescript.svg?v=101
[typescript-url]: https://github.com/microsoft/TypeScript
