import express from 'express';
import rootRouter from './routes/rootRouter';
import { swaggerSpec } from '../swaggerConfig';
import swaggerUi from 'swagger-ui-express';
import { MqttBroker } from './helper/mqttBroker';
import { MessageCreator } from './helper/messageCreater';
import { ReceiverService } from './services/receiverService';

const app = express();

app.use(express.json());

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', rootRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// or wherever you're setting up your services
const mqttBroker = MqttBroker.getInstance();
const messageCreator = new MessageCreator();
const receiverService = new ReceiverService(messageCreator);
mqttBroker.setReceiverService(receiverService);
