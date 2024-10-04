import mqtt from 'mqtt';
import dotenv from 'dotenv';
import { ReceiverService } from '../services/receiverService';
import { IMqttBroker } from '../interfaces/mqttBroker';

dotenv.config();

/**
 * MqttBroker class implements the IMqttBroker interface and manages the MQTT connection.
 * It follows the Singleton pattern to ensure only one instance of the broker exists.
 */
export class MqttBroker implements IMqttBroker {
    private static instance: MqttBroker;
    private client: mqtt.MqttClient;
    private receiverService: ReceiverService | null = null;
    private isInitialized: boolean = false;

    /**
     * Private constructor to prevent direct construction calls with the `new` operator.
     * Initializes the MQTT client and sets up event listeners.
     * @throws {Error} If MQTT_BROKER_URL is not defined in the environment.
     */
    private constructor() {
        const brokerUrl = process.env.MQTT_BROKER_URL;
        if (!brokerUrl) {
            throw new Error('MQTT_BROKER_URL is not defined in the environment');
        }
        this.client = mqtt.connect(brokerUrl);

        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
            this.client.subscribe('spBv1.0/#', (err) => {
                if (!err) {
                    console.log('Subscribed to Sparkplug B topics');
                } else {
                    console.error('Failed to subscribe to Sparkplug B topics:', err);
                }
            });
        });

        this.client.on('message', (topic, message) => {
            if (this.receiverService) {
                this.receiverService.handleIncomingMessage(topic, message);
            }
        });
    }

    /**
     * Gets the singleton instance of MqttBroker.
     * @returns {MqttBroker} The singleton instance of MqttBroker.
     */
    public static getInstance(): MqttBroker {
        if (!MqttBroker.instance) {
            MqttBroker.instance = new MqttBroker();
        }
        return MqttBroker.instance;
    }

    /**
     * Sets the ReceiverService for handling incoming messages.
     * @param {ReceiverService} receiverService - The ReceiverService instance to set.
     */
    public setReceiverService(receiverService: ReceiverService): void {
        if (this.isInitialized) {
            console.log('ReceiverService already set. Ignoring duplicate initialization.');
            return;
        }
        
        this.receiverService = receiverService;
        this.isInitialized = true;
    }

    /**
     * Gets the MQTT client instance.
     * @returns {mqtt.MqttClient} The MQTT client instance.
     */
    public getClient(): mqtt.MqttClient {
        return this.client;
    }

    /**
     * Subscribes to a specified MQTT topic.
     * @param {string} topic - The topic to subscribe to.
     * @returns {Promise<void>} A promise that resolves when the subscription is successful.
     */
    public subscribe(topic: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.subscribe(topic, (error) => {
                if (error) {
                    reject(error);
                } else {
                    console.log(`Subscribed to topic: ${topic}`);
                    resolve();
                }
            });
        });
    }

    /**
     * Publishes a message to a specified MQTT topic.
     * @param {string} topic - The topic to publish to.
     * @param {string | Buffer} message - The message to publish.
     * @returns {Promise<void>} A promise that resolves when the message is successfully published.
     */
    public publish(topic: string, message: string | Buffer): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client.publish(topic, message, (error) => {
                if (error) {
                    reject(error);
                } else {
                    console.log(`Message sent to MQTT: ${topic}`, message.toString());
                    resolve();
                }
            });
        });
    }
}
