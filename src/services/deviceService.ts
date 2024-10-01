import { createDBIRTH, createDDEATH } from "../helper/messageCreater";
import { IDeviceService } from "../interfaces/services/deviceService.interface";
import { PublisherRepository } from "../repositories/publisher.repository";

export class DeviceService implements IDeviceService {
    private repository: PublisherRepository;

    constructor(repository: PublisherRepository) {
        this.repository = repository;
    }

    sendDBIRTH = async(deviceId: string): Promise<void> => {
        const payload = createDBIRTH(deviceId);
        const topic = `spBv1.0/Sparkplug B Devices/DBIRTH/Raspberry Pi/${deviceId}`;

        await this.repository.publishMessage(topic, payload, 'DBIRTH');
    }

    sendDDEATH = async (deviceId: string): Promise<void> => {
        const payload = createDDEATH(deviceId);
        const topic = `spBv1.0/Sparkplug B Devices/DDEATH/Raspberry Pi/${deviceId}`;

        await this.repository.publishMessage(topic, payload, 'DDEATH');
    }
}
