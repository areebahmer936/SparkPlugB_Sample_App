import { MqttClient } from 'mqtt';

export interface IMqttBroker {
    getClient(): MqttClient;
}