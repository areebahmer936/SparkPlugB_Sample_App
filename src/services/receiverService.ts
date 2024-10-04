import { IMessageCreator } from '../interfaces/messageCreator';
import { IReceiverService } from '../interfaces/receiverService';

export class ReceiverService implements IReceiverService {
    private readonly messageCreator: IMessageCreator;
    private messageCallbacks: Map<string, ((message: any) => void)[]> = new Map();

    constructor(messageCreator: IMessageCreator) {
        this.messageCreator = messageCreator;
    }

    public async handleIncomingMessage(topic: string, message: Buffer): Promise<void> {
        const decodedMessage = await this.messageCreator.decodeSparkplugMessage(message);
        
        // Log the received message
        console.log(`Received message on topic: ${topic}`);
        console.log('Decoded message:', decodedMessage);

        const callbacks = this.messageCallbacks.get(topic) || [];
        callbacks.forEach(callback => callback(decodedMessage));
    }

    public waitForMessage(topic: string, timeout: number = 30000): Promise<any> {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                this.removeCallback(topic, callback);
                reject(new Error('Timeout waiting for message'));
            }, timeout);

            const callback = (message: any) => {
                clearTimeout(timer);
                this.removeCallback(topic, callback);
                resolve(message);
            };

            this.addCallback(topic, callback);
        });
    }

    private addCallback(topic: string, callback: (message: any) => void): void {
        const callbacks = this.messageCallbacks.get(topic) || [];
        callbacks.push(callback);
        this.messageCallbacks.set(topic, callbacks);
    }

    private removeCallback(topic: string, callback: (message: any) => void): void {
        const callbacks = this.messageCallbacks.get(topic) || [];
        const index = callbacks.indexOf(callback);
        if (index !== -1) {
            callbacks.splice(index, 1);
            this.messageCallbacks.set(topic, callbacks);
        }
    }
}
