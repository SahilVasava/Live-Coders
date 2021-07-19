import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import api from "../utils/axios";

const ProfileSetting = () => {
  const [fileData, setFileData] = useState("");
  const [file, setFile] = useState("");
  const { user } = useContext(UserContext);

  const handleFileChange = async (e) => {
    try {
      setFileData(e.target.files[0]);
      setFile(e.target.value);
      console.log(e.target.files[0]);
      console.log(e.target.value);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", fileData);
      const result = await api.post(
        "http://localhost:4000/user/avatar",
        formData
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);
  return (
    <div className="column">
      <div className="box">
        <h5 className="subtitle is-5">Edit Profile Info:</h5>
        <div className="columns">
          <div className="column is-half">
            <figure className="image is-64x64 mb-2">
              <img
                className="is-rounded"
                src={
                  user.avatar ||
                  "https://bulma.io/images/placeholders/128x128.png"
                }
                style={{
                  maxHeight: "none",
                  height: "inherit",
                }}
              />
            </figure>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <div className="file is-small">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      accept="image/*"
                      value={file}
                      name="avatar"
                      onChange={handleFileChange}
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">Choose an image…</span>
                    </span>
                    <span
                      className={`file-name ${
                        fileData.name ? "" : "is-hidden"
                      }`}
                    >
                      {fileData.name || "None choosen"}
                    </span>
                  </label>
                </div>
              </div>
              <div className="field">
                <p className="control">
                  <button className="button is-link ">Upload</button>
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
