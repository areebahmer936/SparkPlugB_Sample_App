import { loadProtobuf } from './protobufLoader';

export async function createSparkplugMessage(type: string, payloadData: any): Promise<Buffer> {
    const root = await loadProtobuf();
    const PayloadProto = root.lookupType("com.cirruslink.sparkplug.protobuf.Payload");

    // Validate and create the message
    const payload = PayloadProto.create(payloadData);
    const uint8Array = PayloadProto.encode(payload).finish();
    return Buffer.from(uint8Array); 
}

export function createDBIRTH(deviceId: string) {
    return {
        timestamp: Date.now(),
        metrics: [
            { name: 'temperature', value: 25.0, datatype: 9 },  
            { name: 'humidity', value: 55.5, datatype: 9 }
        ]
    };
}

export function createDDEATH(deviceId: string) {
    return {
        timestamp: Date.now(),
        metrics: []
    };
}