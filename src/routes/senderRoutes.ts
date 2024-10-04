import { Router } from "express";
import { DeviceController } from "../controllers/deviceController";
import { handleError } from "../helper/errorHandler";

const sendRouter = Router();
const deviceController = new DeviceController();

/**
 * @swagger
 * tags:
 *   name: Send
 *   description: Endpoints for sending MQTT messages
 */

/**
 * @swagger
 * /api/send/dbirth:
 *   post:
 *     summary: Publish DBIRTH data to MQTT broker
 *     tags: [Send]
 *     parameters:
 *       - name: deviceId
 *         in: query
 *         description: Device ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       500:
 *         description: Internal Server Error
 */
sendRouter.post('/dbirth', handleError(deviceController.sendDBIRTH));

/**
 * @swagger
 * /api/send/ddeath:
 *   post:
 *     summary: Publish DDEATH data to MQTT broker
 *     tags: [Send]
 *     parameters:
 *       - name: deviceId
 *         in: query
 *         description: Device ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       500:
 *         description: Internal Server Error
 */
sendRouter.post('/ddeath', handleError(deviceController.sendDDEATH));

/**
 * @swagger
 * /api/send/ndeath:
 *   post:
 *     summary: Publish NDEATH data to MQTT broker
 *     tags: [Send]
 *     parameters:
 *       - name: nodeId
 *         in: query
 *         description: Node ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       500:
 *         description: Internal Server Error
 */
sendRouter.post('/ndeath', handleError(deviceController.sendNDEATH));

/**
 * @swagger
 * /api/send/nbirth:
 *   post:
 *     summary: Publish NBIRTH data to MQTT broker
 *     tags: [Send]
 *     parameters:
 *       - name: nodeId
 *         in: query
 *         description: Node ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       500:
 *         description: Internal Server Error
 */
sendRouter.post('/nbirth', handleError(deviceController.sendNBIRTH));

/**
 * @swagger
 * /api/send/ddata:
 *   post:
 *     summary: Publish DDATA to MQTT broker
 *     tags: [Send]
 *     parameters:
 *       - name: deviceId
 *         in: query
 *         description: Device ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               temperature:
 *                 type: number
 *               humidity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       500:
 *         description: Internal Server Error
 */
sendRouter.post('/ddata', handleError(deviceController.sendDDATA));

export default sendRouter;
