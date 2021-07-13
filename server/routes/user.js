import express from "express";
import { uploadAvatar } from "../controllers/userController";
import jwtAuthorization from "../middleware/jwtAuthorization";

const router = express.Router();

router.post("/avatar", jwtAuthorization, uploadAvatar);
