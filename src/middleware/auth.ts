// import { Request, Response, NextFunction } from 'express';
// import { jwtUtil } from '../utils/jwt'; // Asume que has colocado tus funciones JWT en un archivo llamado jwt.ts

// export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers['authorization'];

//   if (!token) {
//     return res.status(401).json({ message: 'Acceso no autorizado' });
//   }

//   try {
//     const decodedToken = await jwtUtil.verifyJwt(token);
//     req.user = decodedToken;
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: 'Token inválido o expirado' });
//   }
// };
