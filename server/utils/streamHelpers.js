import { spawn } from "child_process";
import config from "../config/default";

const cmd = config.rtmp_server.trans.ffmpeg;

export const generateStreamThumbnail = (username) => {
  const args = [
    "-y",
    "-i",
    "http://127.0.0.1:8000/live/" + username + "/index.m3u8",
    "-ss",
    "00:00:01",
    "-vframes",
    "1",
    "-vf",
    "scale=-2:300",
    "./thumbnails/" + username + ".png",
  ];

  const ffmpeg = spawn(cmd, args, {
    detached: true,
    //stdio: "ignore",
  });
  ffmpeg.unref();

  ffmpeg.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  ffmpeg.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  ffmpeg.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};
