import { Stream, User } from "../db";
import bcrypt from "bcrypt";
import { jwtGenerator } from "../utils/jwtGenerator";
import { validationResult } from "express-validator";
import { nanoid } from "nanoid";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        success: false,
      });
    }

    // check if user already exists or not and return error is exists
    const result = await User.findOne({
      where: {
        email,
      },
    });

    if (result !== null) {
      return res.status(401).json({
        message: "User already exists",
        success: false,
      });
    }

    // Generate the hashed password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    // generate a stream key
    const stream_key = nanoid();

    // Create a new user
    const user = await User.create({
      username,
      email,
      password: passwordHash,
      stream_key,
    });

    // Create a stream
    const stream = await Stream.create({ UserId: user.id });

    console.log(user.toJSON());
    console.log(stream.toJSON());

    // Generate a jwt token
    const token = jwtGenerator(user.id);

    res.json({
      message: "User created",
      data: { token, user: user.toJSON() },
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        success: false,
      });
    }

    // check if user exists or not
    const user = await User.scope("withPassword").findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Incorrect credentials",
        success: false,
      });
    }

    console.log(user);
    // check if password's hash matches the saved pasdword's hash
    const validPassword = await bcrypt.compare(password, user.password);
    console.log(validPassword);
    if (!validPassword) {
      return res.status(401).json({
        message: "Incorrect credentials",
        success: false,
      });
    }

    // Generate a jwt token
    const token = jwtGenerator(user.id);
    console.log(token);
    res.json({
      message: "User logged in",
      data: { token, user: user.toJSON() },
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const verify = (req, res) => {
  try {
    res.json({
      message: "token is valid",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const getUser = async (req, res) => {
  try {
    const { user: userId } = req;
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(401).json({
        message: "Incorrect credentials",
        success: false,
      });
    }

    console.log(user);

    res.json({
      message: "User details",
      data: user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    console.log(req.file);
    const { user: userId } = req;

    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Incorrect credentials",
        success: false,
      });
    }
    user.avatar = req.file.path;
    await user.save();
    res.json({
      message: "Image updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
