import express from "express";
import { body } from "express-validator";
import {
  generateStreamKey,
  getStreamKey,
  streamInfo,
  streamInfoAll,
  updateStreamInfo,
} from "../controllers/streamController";
import authorization from "../middleware/jwtAuthorization";

const router = express.Router();

router.get("/info", authorization, streamInfo);
router.post("/info", streamInfoAll);
router.patch(
  "/info",
  body("title").trim().escape().isLength({ min: 3 }),
  authorization,
  updateStreamInfo
);

router.get("/key", authorization, getStreamKey);
router.patch("/key", authorization, generateStreamKey);
export default router;
