import { Request, Response } from 'express';

import { UserService } from '../services/userService';
import logger from '../utils/logger';
import { ResponseUtil } from '../utils/response';
import { JwtUtil } from '../utils/jwt';

export class UserController {

  static async getUsersWithPersons(req: Request, res: Response) {
    try {
      const usersWithPersons = await UserService.getUsersWithPersons();
      ResponseUtil.successResponse(res, usersWithPersons);
    } catch (error: unknown) {
      logger.error(error);
      if (error instanceof Error) {
        res.status(500).json({ success: false, error: error.message });
        return;
      } else {
        res.status(500).json({ success: false, error: 'An unknown error occurred.' });
        return;
      }
    }
  }

  static async createPerson(req: Request, res: Response) {

    const tokenHeader = req.header('Authorization');
    if (!tokenHeader) {
      res.status(401).json({ success: false, error: 'Token no proporcionado en el encabezado' });
      return;
    }

    const token = tokenHeader.replace('Bearer ', '');

    try {

      const decoded = JwtUtil.verifyJwt(token) as { id: number };
      const userId = decoded.id;

      const personData = {
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        lastName: req.body.lastName,
        secondLastName: req.body.secondLastName,
        phoneNumber: req.body.phoneNumber,
        street: req.body.street,
        userId: userId
      };

      const person = await UserService.createPerson(personData);
      if (!person) {
        throw new Error('Persona no se pudo crear.');
      }
      ResponseUtil.successResponse(res, {
        message: 'Persona creada correctamente',
        person
      });
    } catch (error: unknown) {
      logger.error(error);
      if (error instanceof Error) {
        if (error.name === 'ValidationError') {
          res.status(400).json({ success: false, error });
          return;
        }
        res.status(500).json({ success: false, error: error.message });
        return;
      } else {
        res.status(500).json({ success: false, error: 'An unknown error occurred.' });
        return;
      }
    }
  }

}
