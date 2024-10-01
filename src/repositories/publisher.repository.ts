import mqtt from 'mqtt';
import MQTTBroker from '../helper/mqttBroker';
import { createSparkplugMessage } from '../helper/messageCreater';
import { IPublisherRepository } from '../interfaces/repositories/publisherRepositoryInterface';

export class PublisherRepository implements IPublisherRepository {
    private mqttClient: mqtt.MqttClient;

    constructor() {
        this.mqttClient = MQTTBroker.getInstance();
    }

    publishMessage = async (topic: string, payloadData: any, messageType: string): Promise<void> => {
        const payloadBuffer = await createSparkplugMessage(messageType, payloadData);

        return new Promise<void>((resolve, reject) => {
            this.mqttClient.publish(topic, payloadBuffer, {}, (err: any) => {
                if (err instanceof Error) {
                    reject(`Failed to publish to MQTT: ${err.message}`);
                } else {
                    console.log('Message sent to MQTT:', topic, payloadData);
                    resolve();
                }
            });
        });
    }
}
