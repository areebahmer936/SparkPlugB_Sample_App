import { Router } from "express";
import { DeviceController } from "../controllers/deviceController";

const rootRouter = Router();
const deviceController = new DeviceController();

/**
 * @swagger
 * /api/sendDBIRTH:
 *   post:
 *     summary: publish data to mqtt broker
 *     tags:
 *       - Messages
 *     parameters:
 *       - name: deviceId
 *         in: path
 *         description: device ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successful Message sent.
 *       500:
 *         description: Internal Server Error.
 */
rootRouter.post('/sendDBIRTH', deviceController.sendDBIRTH);


/**
 * @swagger
 * /api/sendDDEATH:
 *   post:
 *     summary: publish data to mqtt broker
 *     tags:
 *       - Messages
 *     parameters:
 *       - name: deviceId
 *         in: path
 *         description: device ID
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successful Message sent.
 *       500:
 *         description: Internal Server Error.
 */
rootRouter.post('/sendDDEATH', deviceController.sendDDEATH);

export default rootRouter;
