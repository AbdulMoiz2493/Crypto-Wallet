import express from "express";
import { verifyUserJWT } from "../Middlewares/auth.middleware.js";
import { getTransactionHistory, getWalletBalance, sendETH } from "../Controller/transaction.controller.js";


const router = express.Router();

//User auth routes:
router.post("/send-eth", verifyUserJWT, sendETH);
router.get("/history", verifyUserJWT, getTransactionHistory);
router.get("/balance", verifyUserJWT, getWalletBalance);







export default router;