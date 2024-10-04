import { IDeviceService } from "../interfaces/deviceService";
import { IMessageCreator } from "../interfaces/messageCreator";
import { IPublisherRepository } from "../interfaces/publisherRepository";

export class DeviceService implements IDeviceService {
    private readonly publisherRepository: IPublisherRepository;
    private readonly messageCreator: IMessageCreator;

    constructor(publisherRepository: IPublisherRepository, messageCreator: IMessageCreator) {
        this.publisherRepository = publisherRepository;
        this.messageCreator = messageCreator;
    }

    public async sendDBIRTH(deviceId: string): Promise<void> {
        const payload = this.messageCreator.createDBIRTH(deviceId);
        const topic = `spBv1.0/Sparkplug B Devices/DBIRTH/Raspberry Pi/${deviceId}`;
        await this.publisherRepository.publishMessage(topic, payload, 'DBIRTH');
    }

    public async sendDDEATH(deviceId: string): Promise<void> {
        const payload = this.messageCreator.createDDEATH(deviceId);
        const topic = `spBv1.0/Sparkplug B Devices/DDEATH/Raspberry Pi/${deviceId}`;
        await this.publisherRepository.publishMessage(topic, payload, 'DDEATH');
    }

    public async sendNDEATH(nodeId: string): Promise<void> {
        const payload = this.messageCreator.createNDEATH(nodeId);
        const topic = `spBv1.0/Sparkplug B Devices/NDEATH/${nodeId}`;
        await this.publisherRepository.publishMessage(topic, payload, 'NDEATH');
    }

    public async sendNBIRTH(nodeId: string): Promise<void> {
        const payload = this.messageCreator.createNBIRTH(nodeId);
        const topic = `spBv1.0/Sparkplug B Devices/NBIRTH/${nodeId}`;
        await this.publisherRepository.publishMessage(topic, payload, 'NBIRTH');
    }

    public async sendDDATA(deviceId: string, temperature: number, humidity: number): Promise<void> {
        const payload = this.messageCreator.createDDATA(deviceId, temperature, humidity);
        const topic = `spBv1.0/Sparkplug B Devices/DDATA/Raspberry Pi/${deviceId}`;
        await this.publisherRepository.publishMessage(topic, payload, 'DDATA');
    }
}
