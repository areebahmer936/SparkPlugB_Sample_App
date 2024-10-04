import { Request, Response } from 'express';
import { ReceiverService } from '../services/receiverService';
import { MqttBroker } from '../helper/mqttBroker';
import { MessageCreator } from '../helper/messageCreater';

export class ReceiverController {
    private readonly receiverService: ReceiverService;

    constructor() {
        const messageCreator = new MessageCreator();
        this.receiverService = new ReceiverService(messageCreator);
        MqttBroker.getInstance(this.receiverService); // Ensure MqttBroker is initialized with ReceiverService
    }

    public async receiveMessage(req: Request, res: Response): Promise<void> {
        const { topic } = req.params;
        try {
            const message = await this.receiverService.waitForMessage(topic);
            res.status(200).json({ topic, message });
        } catch (error) {
            res.status(500).json({ error: 'Failed to receive message' });
        }
    }
}
