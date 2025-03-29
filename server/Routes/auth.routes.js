import express from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../Controller/auth.controller.js";
import { verifyUserJWT } from "../Middlewares/auth.middleware.js";

const router = express.Router();

//User auth routes:
router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.post("/logout-user", verifyUserJWT, logoutUser);
router.post('/refresh-token', refreshAccessToken);

export default router;