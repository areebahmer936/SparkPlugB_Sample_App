import mqtt from 'mqtt';

export interface IMqttBroker {
    getClient(): mqtt.MqttClient;
    subscribe(topic: string): Promise<void>;
    publish(topic: string, message: string | Buffer): Promise<void>;
}