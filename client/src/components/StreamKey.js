import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import api from "../utils/axios";

const StreamKey = () => {
  const [streamKey, setStreamKey] = useState("");
  const getStreamKey = async () => {
    const { data } = await api.get("http://localhost:4000/stream/key");
    if (data.success) {
      setStreamKey(data.data.stream_key);
    }
  };
  const generateStreamKey = async () => {
    const { data } = await api.patch("http://localhost:4000/stream/key");
    if (data.success) {
      setStreamKey(data.data.stream_key);
    }
  };
  useEffect(() => {
    getStreamKey();
  }, []);

  return (
    <div className="column is-full">
      <div className="box">
        <h5 className="subtitle is-5">Streaming Key: </h5>
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <span className="has-background-link-light p-2">{streamKey}</span>
            </div>
            <div className="level-item">
              <button className="button is-link " onClick={generateStreamKey}>
                <span className="icon">
                  <i className="fa fa-key"></i>
                </span>
                <span>Regenerate key</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamKey;
