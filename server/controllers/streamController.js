import { Stream, User } from "../db";

export const streamInfo = async (req, res) => {
  try {
    if (req.body.streams) {
      const { streams } = req.body;
      const results = await User.findAll({
        attributes: ["id", "username"],
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
    } else {
      return res.json({
        data: [],
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
