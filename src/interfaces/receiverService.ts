export interface IReceiverService {
    handleIncomingMessage(topic: string, message: Buffer): Promise<void>;
    waitForMessage(topic: string, timeout?: number): Promise<any>;
}
