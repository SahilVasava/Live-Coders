import express from "express";
import { body } from "express-validator";
import { register, login, verify } from "../controllers/userController";
import authorization from "../middleware/jwtAuthorization";

const router = express.Router();

router.post(
  "/register",
  body("username").trim().escape().isLength({ min: 4, max: 20 }),
  body("email").normalizeEmail().isEmail(),
  body("password").notEmpty(),
  register
);

router.post(
  "/login",
  body("email").isEmail().normalizeEmail(),
  body("password").notEmpty(),
  login
);

router.post("/verify", authorization, verify);

router.get("/secret", authorization, (req, res) => {
  res.send("authorized");
});
export default router;
