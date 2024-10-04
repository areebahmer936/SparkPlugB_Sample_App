/**
 * DeviceService class implements IDeviceService interface.
 * It handles the creation and publishing of various Sparkplug B messages
 * including DBIRTH, DDEATH, NDEATH, NBIRTH, and DDATA.
 * 
 * This service uses a publisher repository to send messages and a message creator
 * to generate the appropriate payloads for each message type.
 */
import { IDeviceService } from "../interfaces/deviceService";
import { IMessageCreator } from "../interfaces/messageCreator";
import { IPublisherRepository } from "../interfaces/publisherRepository";

export class DeviceService implements IDeviceService {
    private readonly publisherRepository: IPublisherRepository;
    private readonly messageCreator: IMessageCreator;

    /**
     * Constructs a new DeviceService instance.
     * 
     * @param publisherRepository - The repository used to publish messages.
     * @param messageCreator - The creator used to generate message payloads.
     */
    constructor(publisherRepository: IPublisherRepository, messageCreator: IMessageCreator) {
        this.publisherRepository = publisherRepository;
        this.messageCreator = messageCreator;
    }

    /**
     * Sends a DBIRTH (Device Birth) message for a specific device.
     * 
     * @param deviceId - The ID of the device.
     */
    public sendDBIRTH = async (deviceId: string): Promise<void> => {
        const payload = this.messageCreator.createDBIRTH(deviceId);
        const topic = `spBv1.0/Sparkplug B Devices/DBIRTH/Raspberry Pi/${deviceId}`;
        await this.publisherRepository.publishMessage(topic, payload, 'DBIRTH');
    }

    /**
     * Sends a DDEATH (Device Death) message for a specific device.
     * 
     * @param deviceId - The ID of the device.
     */
    public sendDDEATH = async (deviceId: string): Promise<void> => {
        const payload = this.messageCreator.createDDEATH(deviceId);
        const topic = `spBv1.0/Sparkplug B Devices/DDEATH/Raspberry Pi/${deviceId}`;
        await this.publisherRepository.publishMessage(topic, payload, 'DDEATH');
    }

    /**
     * Sends an NDEATH (Node Death) message for a specific node.
     * 
     * @param nodeId - The ID of the node.
     */
    public sendNDEATH = async (nodeId: string): Promise<void> => {
        const payload = this.messageCreator.createNDEATH(nodeId);
        const topic = `spBv1.0/Sparkplug B Devices/NDEATH/${nodeId}`;
        await this.publisherRepository.publishMessage(topic, payload, 'NDEATH');
    }

    /**
     * Sends an NBIRTH (Node Birth) message for a specific node.
     * 
     * @param nodeId - The ID of the node.
     */
    public sendNBIRTH = async (nodeId: string): Promise<void> => {
        const payload = this.messageCreator.createNBIRTH(nodeId);
        const topic = `spBv1.0/Sparkplug B Devices/NBIRTH/${nodeId}`;
        await this.publisherRepository.publishMessage(topic, payload, 'NBIRTH');
    }

    /**
     * Sends a DDATA (Device Data) message for a specific device with temperature and humidity data.
     * 
     * @param deviceId - The ID of the device.
     * @param temperature - The temperature reading.
     * @param humidity - The humidity reading.
     */
    public sendDDATA = async (deviceId: string, temperature: number, humidity: number): Promise<void> => {
        const payload = this.messageCreator.createDDATA(deviceId, temperature, humidity);
        const topic = `spBv1.0/Sparkplug B Devices/DDATA/Raspberry Pi/${deviceId}`;
        await this.publisherRepository.publishMessage(topic, payload, 'DDATA');
    }
}
