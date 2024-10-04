export interface IPublisherRepository {
    publishMessage(topic: string, payloadData: any, messageType: string): Promise<void>;
}