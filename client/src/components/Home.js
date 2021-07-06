import axios from "axios";
import React, { useEffect, useState } from "react";
import StreamBlock from "./StreamBlock";
import api from "../utils/axios";

const Home = () => {
  const [streams, setStreams] = useState([]);
  const getLiveStreams = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/streams");
      if (data["live"] !== undefined) {
        const { data: streamData } = await api.post(
          "http://localhost:4000/stream/info",
          {
            streams: Object.keys(data["live"]),
          }
        );
        if (streamData.success) {
          console.log(streamData.data);
          setStreams(streamData.data);
        }
        console.log(streamData);
      }
      console.log(data["live"]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLiveStreams();
  }, []);
  return (
    <div className="section">
      <div className="container">
        <div className="columns is-multiline">
          {streams.map((stream) => (
            <StreamBlock key={stream.Stream.id} stream={stream} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
