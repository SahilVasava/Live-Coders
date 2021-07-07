import { spawn } from "child_process";
import { unlink } from "fs/promises";
import path from "path";
import config from "../config/default";

const cmd = config.rtmp_server.trans.ffmpeg;

export const generateStreamThumbnail = (username) => {
  try {
    const args = [
      "-y",
      "-i",
      "http://localhost:8000/live/" + username + "/index.m3u8",
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
    //const ls = spawn("ls");
    //ls.stdout.on("data", (data) => {
    //  console.log(`[ls] stdout: ${data}`);
    //});

    //ffmpeg.stdout.on("data", (data) => {
    //  console.log(`stdout: ${data}`);
    //});

    //ffmpeg.stderr.on("data", (data) => {
    //  console.error(`stderr: ${data}`);
    //});

    //ffmpeg.on("close", (code) => {
    //  console.log(`child process exited with code ${code}`);
    //});
  } catch (error) {
    console.log(error);
  }
};

export const removeThumbnail = async (username) => {
  try {
    const file = path.join(__dirname, `../thumbnails/${username}.png`);
    await unlink(file);
  } catch (error) {
    console.log(error);
  }
};
