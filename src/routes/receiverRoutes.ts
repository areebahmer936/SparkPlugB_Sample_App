import { Router } from "express";
import { ReceiverController } from "../controllers/receiverController";
import { handleError } from "../helper/errorHandler";

const receiveRouter = Router();
const receiverController = new ReceiverController();

/**
 * @swagger
 * tags:
 *   name: Receive
 *   description: Endpoints for receiving MQTT messages
 */

/**
 * @swagger
 * /api/receive/{topic}:
 *   get:
 *     summary: Receive a message from a specific MQTT topic
 *     tags: [Receive]
 *     parameters:
 *       - name: topic
 *         in: path
 *         description: MQTT topic to receive message from
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully received message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 topic:
 *                   type: string
 *                 message:
 *                   type: object
 *       500:
 *         description: Internal Server Error
 */
receiveRouter.get('/:topic', handleError(receiverController.receiveMessage.bind(receiverController)));

export default receiveRouter;
