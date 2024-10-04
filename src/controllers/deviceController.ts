import { Request, Response } from 'express';
import { DeviceService } from '../services/deviceService';
import { ReceiverService } from '../services/receiverService';
import { initializeServices } from '../config/serviceInitializer';

export class DeviceController {
    private readonly deviceService: DeviceService;
    private readonly receiverService: ReceiverService;

    constructor() {
        const services = initializeServices();
        this.deviceService = services.deviceService;
        this.receiverService = services.receiverService;
    }

    public sendDBIRTH = async (req: Request, res: Response): Promise<void> => {
        const { deviceId } = req.query;
        await this.deviceService.sendDBIRTH(String(deviceId));
        res.status(200).json({ message: 'DBIRTH message sent successfully' });
    }

    public sendDDEATH = async (req: Request, res: Response): Promise<void> => {
        const { deviceId } = req.query;
        await this.deviceService.sendDDEATH(String(deviceId));
        res.status(200).json({ message: 'DDEATH message sent successfully' });
    }

    public sendNDEATH = async (req: Request, res: Response): Promise<void> => {
        const { nodeId } = req.query;
        await this.deviceService.sendNDEATH(String(nodeId));
        res.status(200).json({ message: 'NDEATH message sent successfully' });
    }

    public sendNBIRTH = async (req: Request, res: Response): Promise<void> => {
        const { nodeId } = req.query;
        await this.deviceService.sendNBIRTH(String(nodeId));
        res.status(200).json({ message: 'NBIRTH message sent successfully' });
    }

    public sendDDATA = async (req: Request, res: Response): Promise<void> => {
        const { deviceId } = req.query;
        const { temperature, humidity } = req.body;
        await this.deviceService.sendDDATA(String(deviceId), temperature, humidity);
        res.status(200).json({ message: 'DDATA message sent successfully' });
    }
}
