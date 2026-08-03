import express from "express";
const router = express.Router();
import V1Router from "../routers/V1Router.js";

router.use("/v1",V1Router);

export default router