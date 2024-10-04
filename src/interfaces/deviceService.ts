export interface IDeviceService {
    sendDBIRTH(deviceId: string): Promise<void>;
    sendDDEATH(deviceId: string): Promise<void>;
    sendNDEATH(nodeId: string): Promise<void>;
    sendNBIRTH(nodeId: string): Promise<void>;
    sendDDATA(deviceId: string, temperature: number, humidity: number): Promise<void>;
}