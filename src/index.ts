import express from 'express';
import rootRouter from './routes/rootRouter';
import { swaggerSpec } from '../swaggerConfig';
import swaggerUi from 'swagger-ui-express';


const app = express();

app.use(express.json());



app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', rootRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
