export class ReceiverRepository {
    private messageHandlers: Map<string, ((message: any) => void)[]> = new Map();

    public async notifyHandlers(topic: string, decodedMessage: any): Promise<void> {
        const handlers = this.messageHandlers.get(topic) || [];
        handlers.forEach(handler => handler(decodedMessage));
    }

    public async waitForMessage(topic: string, timeout: number): Promise<any> {
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

    public addMessageHandler(topic: string, handler: (message: any) => void): void {
        if (!this.messageHandlers.has(topic)) {
            this.messageHandlers.set(topic, []);
        }
        this.messageHandlers.get(topic)!.push(handler);
    }

    public removeMessageHandler(topic: string, handler: (message: any) => void): void {
        const handlers = this.messageHandlers.get(topic);
        if (handlers) {
            const index = handlers.indexOf(handler);
            if (index !== -1) {
                handlers.splice(index, 1);
            }
        }
    }
}
