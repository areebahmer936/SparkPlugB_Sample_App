export interface IDeviceService {
    sendDBIRTH(deviceId: string): Promise<void>;
    sendDDEATH(deviceId: string): Promise<void>;
}