import { Router } from 'express';
import { UserController } from '../controllers/userController';

const userRouter = Router();

/**
 * @swagger
 * /users/create:
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
userRouter.post('/create', UserController.createPerson);

userRouter.get('/getUsers', UserController.getUsersWithPersons);

export default userRouter;
