import express from "express";
import postRouter from "./postRouter.js";
import userRouter from "./userRouter.js";
const router = express.Router();

router.use("/post",postRouter);
router.use("/user",userRouter);

export default router;
