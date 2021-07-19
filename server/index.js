require("dotenv").config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { sequelize } from "./db";
import path from "path";

import node_media_server from "./media_server";
import authRoute from "./routes/auth";
import streamRoute from "./routes/stream";
import userRoute from "./routes/user";
import { thumbnailGeneratorJob } from "./cron/thumbnails";

const app = express();
const port = process.env.port || 4000;

// Sync db
sequelize.sync({ alter: true }).then(() => {
  console.log("All models were synchronized successfully.");
});

//middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(morgan("tiny"));

// Start the RTMP server
node_media_server.run();

// Start the thumbnail generator cron job
thumbnailGeneratorJob.start();

app.use("/test", (req, res) => {
  res.send("hey");
});

// routes
app.use("/auth", authRoute);
app.use("/stream", streamRoute);
app.use("/user", userRoute);

app.use("/thumbnails", express.static(path.join(__dirname, "thumbnails")));

app.listen(port, () => {
  console.log(`App listening on ${port}!`);
});
