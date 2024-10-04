import { Request, Response } from 'express';
import { DeviceService } from '../services/deviceService';
import { PublisherRepository } from '../repositories/publisherRepository';
import { MqttBroker } from '../helper/mqttBroker';
import { MessageCreator } from '../helper/messageCreater';
import { ReceiverService } from '../services/receiverService';

export class DeviceController {
    private readonly deviceService: DeviceService;
    private readonly receiverService: ReceiverService;

    constructor() {
        const messageCreator = new MessageCreator();
        this.receiverService = new ReceiverService(messageCreator);
        const mqttBroker = MqttBroker.getInstance();
        mqttBroker.setReceiverService(this.receiverService);
        const publisherRepository = new PublisherRepository(mqttBroker, messageCreator);
        this.deviceService = new DeviceService(publisherRepository, messageCreator);
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
