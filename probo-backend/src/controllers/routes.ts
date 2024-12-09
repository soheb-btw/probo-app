import express from "express";
import { userRouter } from "./user";
import { balanceRouter } from "./balanceRoutes";
import { orderRoutes } from "./orderRoutes";
import { redisManager } from "../RedisManager";
import { QueueData } from "../utils/types";
import { APIType } from "../utils/constants";

const router = express.Router();

router.use("/user", userRouter);
router.use("/balance", balanceRouter);
router.use("/order", orderRoutes);

router.post("/onramp/inr", async (req, res) => {
    const queueData: QueueData = {
        type: APIType.OnRamp,
        data: req.body,
    };
    try {
        const response = await redisManager.publishAndWaitForResponse(queueData, req.body.userId);
        res.status(200).json({
            message: "INR deposited successfully"
        });
    } catch (error) {
        res.send("Error");
    }
});

export default router;

