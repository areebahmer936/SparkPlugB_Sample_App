import { IReceiverService } from '../interfaces/receiverService';
import { MessageCreator } from '../helper/messageCreater';

/**
 * ReceiverService class implements IReceiverService interface.
 * It handles incoming MQTT messages, decodes them, and manages message handlers.
 */
export class ReceiverService implements IReceiverService {
    private messageCreator: MessageCreator;
    private messageHandlers: Map<string, ((message: any) => void)[]> = new Map();

    /**
     * Constructs a new ReceiverService instance.
     * 
     * @param messageCreator - The MessageCreator used to decode incoming messages.
     */
    constructor(messageCreator: MessageCreator) {
        this.messageCreator = messageCreator;
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
            
            // Notify all handlers for this topic
            const handlers = this.messageHandlers.get(topic) || [];
            handlers.forEach(handler => handler(decodedMessage));
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
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                this.removeMessageHandler(topic, messageHandler);
                reject(new Error('Timeout waiting for message'));
            }, timeout);

            const messageHandler = (decodedMessage: any) => {
                clearTimeout(timer);
                this.removeMessageHandler(topic, messageHandler);
                resolve(decodedMessage);
            };

            this.addMessageHandler(topic, messageHandler);
        });
    }

    /**
     * Adds a message handler for a specific topic.
     * 
     * @param topic - The MQTT topic to add the handler for.
     * @param handler - The handler function to be called when a message is received.
     */
    private addMessageHandler(topic: string, handler: (message: any) => void): void {
        if (!this.messageHandlers.has(topic)) {
            this.messageHandlers.set(topic, []);
        }
        this.messageHandlers.get(topic)!.push(handler);
    }

    /**
     * Removes a message handler for a specific topic.
     * 
     * @param topic - The MQTT topic to remove the handler from.
     * @param handler - The handler function to be removed.
     */
    private removeMessageHandler(topic: string, handler: (message: any) => void): void {
        const handlers = this.messageHandlers.get(topic);
        if (handlers) {
            const index = handlers.indexOf(handler);
            if (index !== -1) {
                handlers.splice(index, 1);
            }
        }
    }
}
