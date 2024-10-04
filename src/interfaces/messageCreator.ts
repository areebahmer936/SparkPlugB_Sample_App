export interface IMessageCreator {
    createSparkplugMessage(messageType: string, payloadData: any): Promise<Buffer>;
    decodeSparkplugMessage(message: Buffer): Promise<any>;
    createDBIRTH(deviceId: string): any;
    createDDEATH(deviceId: string): any;
    createNDEATH(nodeId: string): any;
    createNBIRTH(nodeId: string): any;
    createDDATA(deviceId: string, temperature: number, humidity: number): any;
}