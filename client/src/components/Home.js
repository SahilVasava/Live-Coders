import axios from "axios";
import React, { useEffect } from "react";
import StreamBlock from "./StreamBlock";
import api from "../utils/axios";

const Home = () => {
  const getLiveStreams = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/streams");
      const results = await api.get("http://localhost:4000/stream/info");
      console.log(data["live"]);
      console.log(results);
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
          <StreamBlock />
          <StreamBlock />
          <StreamBlock />
          <StreamBlock />
          <StreamBlock />
          <StreamBlock />
          <StreamBlock />
          <StreamBlock />
        </div>
      </div>
    </div>
  );
};

export default Home;
