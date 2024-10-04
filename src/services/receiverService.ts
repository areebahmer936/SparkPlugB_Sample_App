import { IReceiverService } from '../interfaces/receiverService';
import { MessageCreator } from '../helper/messageCreater';
import { ReceiverRepository } from '../repositories/receiverRepository';

export class ReceiverService implements IReceiverService {
    private messageCreator: MessageCreator;
    private receiverRepository: ReceiverRepository;

    constructor(messageCreator: MessageCreator, receiverRepository: ReceiverRepository) {
        this.messageCreator = messageCreator;
        this.receiverRepository = receiverRepository;
    }

    /**
     * Handles an incoming MQTT message.
     * Decodes the message and notifies all registered handlers for the topic.
     * 
     * @param topic - The MQTT topic of the incoming message.
     * @param message - The raw message buffer.
     */
    public handleIncomingMessage = async (topic: string, message: Buffer): Promise<void> => {
        console.log(`Received message on topic: ${topic}`);
        try {
            const decodedMessage = await this.messageCreator.decodeSparkplugMessage(message);
            console.log('Decoded message:', decodedMessage);
            
            await this.receiverRepository.notifyHandlers(topic, decodedMessage);
        } catch (error) {
            console.error('Error decoding message:', error);
        }
    }

    /**
     * Waits for a message on a specific topic.
     * Returns a promise that resolves with the decoded message or rejects on timeout.
     * 
     * @param topic - The MQTT topic to wait for.
     * @param timeout - The maximum time to wait in milliseconds (default: 30000).
     * @returns A promise that resolves with the decoded message.
     */
    public waitForMessage = async (topic: string, timeout: number = 30000): Promise<any> => {
        return this.receiverRepository.waitForMessage(topic, timeout);
    }
}
