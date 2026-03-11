import express from "express";
import { authenticateUser } from "../middleware/userAuth.js";
import { getCurrentUser, login, logout, register } from "../controllers/authController.js";

const authRouter = express.Router();

// Define routes
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", authenticateUser, getCurrentUser);

export default authRouter;
