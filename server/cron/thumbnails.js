import { CronJob } from "cron";
import axios from "axios";
import config from "../config/default";
import { generateStreamThumbnail } from "../utils/streamHelpers";

const port = config.rtmp_server.http.port;

export const thumbnailGeneratorJob = new CronJob("*/5 * * * * *", async () => {
  try {
    const { data } = await axios.get(`http://localhost:${port}/api/streams`);
    if (typeof data["live"] !== undefined) {
      const streams = Object.keys(data.live);
      streams.forEach((stream) => generateStreamThumbnail(stream));
    }
    console.log(data);
  } catch (error) {}
});
