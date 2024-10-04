import * as mqtt from 'mqtt';
import dotenv from 'dotenv';
import { IMqttBroker } from '../interfaces/mqttBroker';
import { IReceiverService } from '../interfaces/receiverService';

dotenv.config();

export class MqttBroker implements IMqttBroker {
    private static instance: MqttBroker;
    private client: mqtt.MqttClient;
    private receiverService: IReceiverService;

    private constructor(receiverService: IReceiverService) {
        this.receiverService = receiverService;
        this.client = mqtt.connect(process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883', {
            clientId: process.env.MQTT_CLIENT_ID || 'sparkplug-client',
            clean: true,
            connectTimeout: 4000,
            reconnectPeriod: 1000,
        });

        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
            this.subscribeToTopics();
        });

        this.client.on('error', (err) => {
            console.error('MQTT connection error:', err);
        });

        this.client.on('message', (topic, message) => {
            this.receiverService.handleIncomingMessage(topic, message);
        });
    }

    public static getInstance(receiverService: IReceiverService): MqttBroker {
        if (!MqttBroker.instance) {
            MqttBroker.instance = new MqttBroker(receiverService);
        }
        return MqttBroker.instance;
    }

    public getClient(): mqtt.MqttClient {
        return this.client;
    }

    private subscribeToTopics(): void {
        const topics = [
            'spBv1.0/+/NBIRTH/#',
            'spBv1.0/+/DBIRTH/#',
            'spBv1.0/+/NDATA/#',
            'spBv1.0/+/DDATA/#',
            'spBv1.0/+/NDEATH/#',
            'spBv1.0/+/DDEATH/#'
        ];

        topics.forEach(topic => {
            this.client.subscribe(topic, (err) => {
                if (err) {
                    console.error(`Error subscribing to ${topic}:`, err);
                } else {
                    console.log(`Subscribed to ${topic}`);
                }
            });
        });
    }
}
