import { MqttBroker } from '../helper/mqttBroker';
import { MessageCreator } from '../helper/messageCreater';
import { ReceiverService } from '../services/receiverService';
import { ReceiverRepository } from '../repositories/receiverRepository';
import { PublisherRepository } from '../repositories/publisherRepository';
import { DeviceService } from '../services/deviceService';

export function initializeServices() {
    const mqttBroker = MqttBroker.getInstance();
    const messageCreator = new MessageCreator();
    const receiverRepository = new ReceiverRepository();
    const receiverService = new ReceiverService(messageCreator, receiverRepository);
    mqttBroker.setReceiverService(receiverService);

    const publisherRepository = new PublisherRepository(mqttBroker, messageCreator);
    const deviceService = new DeviceService(publisherRepository, messageCreator);

    return {
        mqttBroker,
        messageCreator,
        receiverRepository,
        receiverService,
        publisherRepository,
        deviceService
    };
}
