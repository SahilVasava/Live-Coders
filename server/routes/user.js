import express from "express";
import { getUser, uploadAvatar } from "../controllers/userController";
import jwtAuthorization from "../middleware/jwtAuthorization";
import { parser } from "../utils/cloudinary";

const router = express.Router();

router.get("/", jwtAuthorization, getUser);
router.post("/avatar", jwtAuthorization, parser.single("image"), uploadAvatar);

export default router;
