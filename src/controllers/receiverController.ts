import { Request, Response } from 'express';
import { ReceiverService } from '../services/receiverService';
import { MqttBroker } from '../helper/mqttBroker';
import { initializeServices } from '../config/serviceInitializer';

export class ReceiverController {
    private readonly receiverService: ReceiverService;
    private readonly mqttBroker: MqttBroker;

    constructor() {
        const services = initializeServices();
        this.receiverService = services.receiverService;
        this.mqttBroker = services.mqttBroker;
    }

    public async receiveMessage(req: Request, res: Response): Promise<void> {
        const { topic } = req.params;
        try {
            await this.mqttBroker.subscribe(topic);
            const message = await this.receiverService.waitForMessage(topic);
            res.status(200).json({ topic, message });
        } catch (error) {
            console.error('Error receiving message:', error);
            res.status(500).json({ error: 'Failed to receive message' });
        }
    }
}
