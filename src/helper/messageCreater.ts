import { IMessageCreator } from '../interfaces/messageCreator';
import { loadProtobuf } from './protobufLoader';
export class MessageCreator implements IMessageCreator {
    constructor() {}

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
    
        public async decodeSparkplugMessage(message: Buffer): Promise<any> {
            const root = await loadProtobuf();
            const PayloadProto = root.lookupType("com.cirruslink.sparkplug.protobuf.Payload");
            const decodedPayload = PayloadProto.decode(message);
            return PayloadProto.toObject(decodedPayload);
        }
    
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

    public createDDEATH(deviceId: string): any {
        return {
            timestamp: Date.now(),
            metrics: []
        };
    }

    public createNDEATH(nodeId: string): any {
        return {
            timestamp: Date.now(),
            metrics: []
        };
    }

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