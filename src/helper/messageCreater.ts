/**
 * MessageCreator class implements the IMessageCreator interface.
 * It provides methods for creating and decoding Sparkplug B messages.
 * This class handles the creation of DBIRTH, DDEATH, NDEATH, NBIRTH, and DDATA messages,
 * as well as encoding and decoding of Sparkplug B payloads using Protocol Buffers.
 */
import { IMessageCreator } from '../interfaces/messageCreator';
import { loadProtobuf } from './protobufLoader';

export class MessageCreator implements IMessageCreator {
    constructor() {}

    /**
     * Creates a Sparkplug B message with the given message type and payload data.
     * @param messageType - The type of Sparkplug B message.
     * @param payloadData - The data to be included in the payload.
     * @returns A Promise that resolves to a Buffer containing the encoded message.
     */
    public async createSparkplugMessage(messageType: string, payloadData: any): Promise<Buffer> {
        const root = await loadProtobuf();
        const PayloadProto = root.lookupType("com.cirruslink.sparkplug.protobuf.Payload");
        
        // Add timestamp to the payload
        const fullPayload = {
            ...payloadData,
            timestamp: Date.now()
        };
        
        // Validate and create the message
        const payload = PayloadProto.create(fullPayload);
        const uint8Array = PayloadProto.encode(payload).finish();
        return Buffer.from(uint8Array);
    }
    
    /**
     * Decodes a Sparkplug B message from a Buffer.
     * @param message - The Buffer containing the encoded Sparkplug B message.
     * @returns A Promise that resolves to the decoded message object.
     */
    public async decodeSparkplugMessage(message: Buffer): Promise<any> {
        const root = await loadProtobuf();
        const PayloadProto = root.lookupType("com.cirruslink.sparkplug.protobuf.Payload");
        const decodedPayload = PayloadProto.decode(message);
        return PayloadProto.toObject(decodedPayload);
    }
    
    /**
     * Creates a DBIRTH (Device Birth) message payload.
     * @param deviceId - The ID of the device.
     * @returns An object representing the DBIRTH message payload.
     */
    public createDBIRTH(deviceId: string): any {
        return {
            timestamp: Date.now(),
            metrics: [
                { name: 'Node Control/Rebirth', value: false, type: 'Boolean', datatype: 11 },
                { name: 'temperature', value: 25.0, type: 'Double', datatype: 9 },
                { name: 'humidity', value: 55.5, type: 'Double', datatype: 9 }
            ]
        };
    }

    /**
     * Creates a DDEATH (Device Death) message payload.
     * @param deviceId - The ID of the device.
     * @returns An object representing the DDEATH message payload.
     */
    public createDDEATH(deviceId: string): any {
        return {
            timestamp: Date.now(),
            metrics: []
        };
    }

    /**
     * Creates an NDEATH (Node Death) message payload.
     * @param nodeId - The ID of the node.
     * @returns An object representing the NDEATH message payload.
     */
    public createNDEATH(nodeId: string): any {
        return {
            timestamp: Date.now(),
            metrics: []
        };
    }

    /**
     * Creates an NBIRTH (Node Birth) message payload.
     * @param nodeId - The ID of the node.
     * @returns An object representing the NBIRTH message payload.
     */
    public createNBIRTH(nodeId: string): any {
        return {
            timestamp: Date.now(),
            metrics: [
                { name: 'Node Control/Rebirth', value: false, type: 'Boolean', datatype: 11 },
                { name: 'Node Control/Next Server', value: null, type: 'String', datatype: 12 },
                { name: 'Node Control/Reboot', value: false, type: 'Boolean', datatype: 11 },
                { name: 'Properties/Hardware Make', value: 'Raspberry Pi', type: 'String', datatype: 12 },
                { name: 'Properties/Hardware Model', value: '4B', type: 'String', datatype: 12 },
                { name: 'Properties/OS', value: 'Linux', type: 'String', datatype: 12 },
                { name: 'Properties/OS Version', value: '5.10.103-v7l+', type: 'String', datatype: 12 }
            ]
        };
    }

    /**
     * Creates a DDATA (Device Data) message payload.
     * @param deviceId - The ID of the device.
     * @param temperature - The temperature reading.
     * @param humidity - The humidity reading.
     * @returns An object representing the DDATA message payload.
     */
    public createDDATA(deviceId: string, temperature: number, humidity: number): any {
        return {
            timestamp: Date.now(),
            metrics: [
                { name: 'temperature', value: temperature, type: 'Double', datatype: 9 },
                { name: 'humidity', value: humidity, type: 'Double', datatype: 9 }
            ]
        };
    }
}