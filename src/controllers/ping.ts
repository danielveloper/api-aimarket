/**
 * @swagger
 * /ping:
 *   get:
 *     summary: Ping server
 *     responses:
 *       200:
 *         description: Ping successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PingResponse'
 *       500:
 *         description: Internal Server Error
 */
interface PingResponse {
  message: string;
}

export default class PingController {
  public async getMessage(): Promise<PingResponse> {
    return {
      message: 'Pong',
    };
  }
}
