import { validationResult } from "express-validator";
import { nanoid } from "nanoid";
import { Stream, User } from "../db";

export const streamInfoAll = async (req, res) => {
  try {
    if (!req.body.streams) {
      return res.json({
        data: [],
        success: true,
      });
    }
    const { streams } = req.body;
    const results = await User.findAll({
      attributes: ["id", "username", "avatar"],
      where: {
        username: streams,
      },
      include: [
        {
          model: Stream,
        },
      ],
    });

    console.log(`results ${JSON.stringify(results)}`);

    return res.json({
      data: results,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const streamInfo = async (req, res) => {
  try {
    const { user: userId } = req;
    if (!userId) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

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
    let stream = await user.getStream();

    console.log(`results ${JSON.stringify(stream)}`);

    return res.json({
      data: stream,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
export const getStreamKey = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }
    const userRes = await User.findOne({
      where: { id: user },
      attributes: ["id", "stream_key"],
    });
    console.log(userRes.dataValues);
    const { stream_key } = userRes.dataValues;
    return res.json({
      data: { stream_key },
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const generateStreamKey = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.json({
        message: "Invalid credentials",
        success: false,
      });
    }
    const results = await User.update(
      { stream_key: nanoid() },
      {
        where: {
          id: user,
        },
        returning: ["id", "stream_key"],
        plain: true,
      }
    );
    console.log(results[1].dataValues);
    const { stream_key } = results[1].dataValues;
    return res.json({
      data: { stream_key },
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const updateStreamInfo = async (req, res) => {
  try {
    console.log("update");
    console.log(req.body);
    const errors = validationResult(req);
    const { title } = req.body;
    const { user: userId } = req;

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({
        errors: errors.array(),
        success: false,
      });
    }

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
    let stream = await user.getStream();
    stream = await stream.update({ title });
    console.log(stream);

    return res.json({
      message: "Title updated",
      data: { stream: stream.dataValues },
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
