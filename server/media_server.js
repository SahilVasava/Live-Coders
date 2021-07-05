import node_media_server from "node-media-server";
import config from "./config/default";
import { User } from "./db";

const nms = new node_media_server(config.rtmp_server);

nms.on("prePublish", async (id, StreamPath, args) => {
  try {
    const stream_key = getStreamKeyFromPath(StreamPath);
    console.log(
      "[NodeEvent on prePublish]",
      `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
    );

    const user = await User.findOne({
      where: {
        stream_key,
      },
    });
    console.log(`user ${JSON.stringify(user)}`);

    if (!user) {
      const session = nms.getSession(id);
      session.reject();
    } else {
      const stream = await user.getStream();
      stream.active = true;
      await stream.save();
    }
  } catch (error) {
    console.log(error);
  }
});

const getStreamKeyFromPath = (StreamPath) => {
  const parts = StreamPath.split("/");
  return parts[parts.length - 1];
};

module.exports = nms;
