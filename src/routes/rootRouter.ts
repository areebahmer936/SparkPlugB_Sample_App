import { Router } from "express";
import { DeviceController } from "../controllers/deviceController";
import { handleError } from "../helper/errorHandler";

const rootRouter = Router();
const deviceController = new DeviceController();

/**
 * @swagger
 * /api/sendDBIRTH:
 *   post:
 *     summary: publish DBIRTH data to mqtt broker
 *     tags:
 *       - Messages
 *     parameters:
 *       - name: deviceId
 *         in: query
 *         description: device ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful Message sent.
 *       500:
 *         description: Internal Server Error.
 */
rootRouter.post('/sendDBIRTH', handleError(deviceController.sendDBIRTH));


/**
 * @swagger
 * /api/sendDDEATH:
 *   post:
 *     summary: publish DDEATH data to mqtt broker
 *     tags:
 *       - Messages
 *     parameters:
 *       - name: deviceId
 *         in: query
 *         description: device ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful Message sent.
 *       500:
 *         description: Internal Server Error.
 */
rootRouter.post('/sendDDEATH', handleError(deviceController.sendDDEATH));

export default rootRouter;
