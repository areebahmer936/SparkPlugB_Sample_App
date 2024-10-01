import * as mqtt from 'mqtt';
import dotenv from 'dotenv';

dotenv.config();

class MQTTBroker {
    private static instance: mqtt.MqttClient;

    private constructor() {}

    public static getInstance(): mqtt.MqttClient {
        if (!MQTTBroker.instance) {
            MQTTBroker.instance = mqtt.connect(process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883', {
                clientId: process.env.MQTT_CLIENT_ID || 'sparkplug-client',
                clean: true,
                connectTimeout: 4000,
                reconnectPeriod: 1000,
            });

            MQTTBroker.instance.on('connect', () => {
                console.log('Connected to MQTT broker');
            });

            MQTTBroker.instance.on('error', (err) => {
                console.error('MQTT connection error:', err);
            });
        }
        return MQTTBroker.instance;
    }
}

export default MQTTBroker;
