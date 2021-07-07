import express from "express";
import { streamInfo } from "../controllers/streamController";
import authorization from "../middleware/jwtAuthorization";

const router = express.Router();

router.post("/info", streamInfo);

export default router;
