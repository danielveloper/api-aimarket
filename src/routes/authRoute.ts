import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const authRouter = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create User
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRequest'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
authRouter.post('/register', AuthController.createUser);

authRouter.post('/login', AuthController.login);


export default authRouter;
