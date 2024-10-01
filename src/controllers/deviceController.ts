import { Request, Response } from 'express';
import { DeviceService } from '../services/deviceService';
import { PublisherRepository } from '../repositories/publisher.repository';

export class DeviceController {
    private deviceService: DeviceService;

    constructor() {
        const pubRepository = new PublisherRepository();
        this.deviceService = new DeviceService(pubRepository);
    }

    sendDBIRTH = async (req: Request, res: Response): Promise<void> => {
        const { deviceId } = req.body;
        await this.deviceService.sendDBIRTH(deviceId);
        res.status(200).send({ message: 'DBIRTH message sent successfully' });
    }

    sendDDEATH = async (req: Request, res: Response): Promise<void> => {
        const { deviceId } = req.body;
        await this.deviceService.sendDDEATH(deviceId);
        res.status(200).send({ message: 'DDEATH message sent successfully' });
    }
}
