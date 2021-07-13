import React, { useState, useEffect } from "react";
import api from "../utils/axios";

const ProfileSetting = () => {
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
        <h5 className="subtitle is-5">Edit Profile Info:</h5>
        <div className="columns">
          <div className="column is-half">
            <form onSubmit={updateStreamInfo}>
              <div className="field">
                <div className="file">
                  <label className="file-label">
                    <input className="file-input" type="file" name="avatar" />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">Choose a file…</span>
                    </span>
                  </label>
                </div>
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

export default ProfileSetting;
