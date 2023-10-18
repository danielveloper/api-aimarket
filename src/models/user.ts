import { IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Auto-generated serial id of the user
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *         userType?:
 *           type: string
 *           description: Type of the user
 *         person?:
 *           $ref: '#/components/schemas/Person'
 */

export class User {
  @IsNumber()
  id: number;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  userType?: string;

}

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRequest:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the user
 *         password:
 *           type: string
 *           description: Password of the user
 */
export interface UserRequest {
  email: string;
  password: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UserResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Token of the user
 */
export interface UserResponse {
  token: string;
}
