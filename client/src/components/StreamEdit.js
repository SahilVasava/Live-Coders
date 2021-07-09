import React, { useState, useEffect } from "react";
import api from "../utils/axios";

const StreamEdit = () => {
  const [title, setTitle] = useState("");
  const getStreamInfo = async () => {
    try {
      const { data } = await api.get("http://localhost:4000/stream/info");
      if (data.success) {
        setTitle(data.data.title);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateStreamInfo = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.patch("http://localhost:4000/stream/info", {
        title,
      });
      console.log(data);
      if (data.success) {
        setTitle(data.data.stream.title);
      }
    } catch (error) {
      console.log(error);
      getStreamInfo();
    }
  };

  useEffect(() => {
    getStreamInfo();
  }, []);
  return (
    <div className="column">
      <div className="box">
        <h5 className="subtitle is-5">Edit Stream Info:</h5>
        <div className="columns">
          <div className="column is-half">
            <form onSubmit={updateStreamInfo}>
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  ></input>
                  <span className="icon is-small is-left">
                    <i className="fas fa-info"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button className="button is-link ">Done</button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamEdit;
