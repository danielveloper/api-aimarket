//authController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/authService';
import logger from '../utils/logger';
import { ResponseUtil } from '../utils/response';
import { JwtUtil } from '../utils/jwt';
import { User } from '../entities';

export class AuthController {
  static async createUser(req: Request, res: Response) {

    const userData = {
      email: req.body.email,
      password: req.body.password,
    };

    try {

      const user = await UserService.createUser(userData);
      if (!user) {
        throw new Error('No se pudo crear');
      }

      if (user instanceof User) {
        ResponseUtil.successResponse(res, {
          message: 'Usuario creado correctamente',
          token: JwtUtil.signJwt(user.id, user.email)!,
          // user // descomentar en desarrollo para verificar usuario
        });
      }

    } catch (error: unknown) {
      logger.error(error);
      if (error instanceof Error) {
        ResponseUtil.badRequestResponse(
          res, error.message,
        );
      } else {
        res.status(500).json({
          message: 'Ocurrió un error al crear el usuario',
        });
      }
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await UserService.findUserByEmail(email);

      if (user && (await UserService.comparePassword(password, user.password))) {
        const token = JwtUtil.signJwt(user.id, user.email);
        ResponseUtil.successResponse(res, {
          token,
        });
      } else {
        ResponseUtil.unauthorizedResponse(res, 'Credenciales inválidas');
      }
    } catch (error: unknown) {
      logger.error(error);
      if (error instanceof Error) {
        ResponseUtil.badRequestResponse(res, error.message);
      } else {
        res.status(500).json({
          message: 'Ocurrió un error al iniciar sesión',
        });
      }
    }
  }
}
