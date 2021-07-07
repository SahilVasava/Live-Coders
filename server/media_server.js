import node_media_server from "node-media-server";
import config from "./config/default";
import { User } from "./db";
import {
  generateStreamThumbnail,
  removeThumbnail,
} from "./utils/streamHelpers";

const nms = new node_media_server(config.rtmp_server);

nms.on("prePublish", async (id, StreamPath, args) => {
  try {
    const username = getUsernameFromPath(StreamPath);
    const stream_key = args.key;
    const session = nms.getSession(id);

    console.log(
      "[NodeEvent on prePublish]",
      `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
    );

    if (!username || !stream_key) {
      return session.reject();
    }

    const user = await User.findOne({
      where: {
        stream_key,
        username,
      },
    });
    console.log(`user ${JSON.stringify(user)}`);

    if (!user) {
      session.reject();
    } else {
      const stream = await user.getStream();
      console.log(`stream ${stream}`);
      stream.active = true;
      await stream.save();
      generateStreamThumbnail(user.username);
    }
  } catch (error) {
    console.log(error);
  }
});

nms.on("donePublish", async (id, StreamPath, args) => {
  try {
    const username = getUsernameFromPath(StreamPath);
    const stream_key = args.key;
    const session = nms.getSession(id);

    console.log(
      "[NodeEvent on donePublish]",
      `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
    );

    const user = await User.findOne({
      where: {
        stream_key,
        username,
      },
    });
    console.log(`user ${JSON.stringify(user)}`);

    if (user) {
      const stream = await user.getStream();
      console.log(`stream ${stream}`);
      stream.active = false;
      await stream.save();
      await removeThumbnail(username);
    }
  } catch (error) {
    console.log(error);
  }
});

/* Const getStreamKeyFromPath = (StreamPath) => {
  const parts = StreamPath.split("/");
  return parts[parts.length - 1];
}; */

const getUsernameFromPath = (StreamPath) => {
  const parts = StreamPath.split("/");
  return parts[parts.length - 1];
};

module.exports = nms;
