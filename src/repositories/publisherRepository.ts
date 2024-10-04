import { MqttClient } from 'mqtt';
import { IMessageCreator } from '../interfaces/messageCreator';
import { IMqttBroker } from '../interfaces/mqttBroker';
import { IPublisherRepository } from '../interfaces/publisherRepository';

export class PublisherRepository implements IPublisherRepository {
    private readonly mqttClient: MqttClient;
    private readonly messageCreator: IMessageCreator;

    constructor(mqttBroker: IMqttBroker, messageCreator: IMessageCreator) {
        this.mqttClient = mqttBroker.getClient();
        this.messageCreator = messageCreator;
    }

    public async publishMessage(topic: string, payloadData: any, messageType: string): Promise<void> {
        const payloadBuffer = await this.messageCreator.createSparkplugMessage(messageType, payloadData);

        return new Promise<void>((resolve, reject) => {
            this.mqttClient.publish(topic, payloadBuffer, {}, (error?: Error) => {
                if (error) {
                    reject(new Error(`Failed to publish to MQTT: ${error.message}`));
                } else {
                    console.log('Message sent to MQTT:', topic, payloadData);
                    resolve();
                }
            });
        });
    }
}
