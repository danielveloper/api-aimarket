import { IsNotEmpty } from 'class-validator';

/**
 * @swagger
 * components:
 *   schemas:
 *     Person:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Auto-generated serial id of the person
 *         firstName:
 *           type: string
 *           description: First name of the person
 *         secondName:
 *           type: string
 *           description: Second name of the person
 *         lastName:
 *           type: string
 *           description: Last name of the person
 *         secondLastName:
 *           type: string
 *           description: Second last name of the person
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the person
 *         street:
 *           type: string
 *           description: Street address of the person
 */

export class Person {
  id: number;

  @IsNotEmpty()
  firstName: string;

  secondName: string;

  @IsNotEmpty()
  lastName: string;

  secondLastName: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  street: string;

}

/**
 * @swagger
 * components:
 *   schemas:
 *     PersonRequest:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: First name of the person
 *         secondName:
 *           type: string
 *           description: Second name of the person
 *         lastName:
 *           type: string
 *           description: Last name of the person
 *         secondLastName:
 *           type: string
 *           description: Second last name of the person
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the person
 *         street:
 *           type: string
 *           description: Street address of the person
 */
export interface PersonRequest {
  firstName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  phoneNumber: string;
  street: string;
  userId: number;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     PersonResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: Auto-generated serial id of the person
 *         firstName:
 *           type: string
 *           description: First name of the person
 *         secondName:
 *           type: string
 *           description: Second name of the person
 *         lastName:
 *           type: string
 *           description: Last name of the person
 *         secondLastName:
 *           type: string
 *           description: Second last name of the person
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the person
 *         street:
 *           type: string
 *           description: Street address of the person
 */
export interface PersonResponse {
  id: string;
  firstName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  phoneNumber: string;
  street: string;
}
