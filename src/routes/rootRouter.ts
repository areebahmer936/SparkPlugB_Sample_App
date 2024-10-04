import { Router } from "express";
import sendRouter from "./senderRoutes";
import receiveRouter from "./receiverRoutes";

const rootRouter = Router();

rootRouter.use('/send', sendRouter);
rootRouter.use('/receive', receiveRouter);

export default rootRouter;
