import express from 'express';
import PingController from '../controllers/ping';
import userRouter from './userRoute';
import authRouter from './authRoute';
import productRouter from './productRoute';

const router = express.Router();

/**
 * @swagger
 * /api/v1/ping:
 *   get:
 *     summary: Ping server
 *     responses:
 *       200:
 *         description: Ping successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "pong"
 *       500:
 *         description: Internal Server Error
 */

router.get('/ping', async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/products', productRouter);

export default router;
