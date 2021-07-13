import React from "react";
import ProfileSetting from "./ProfileSetting";
import StreamEdit from "./StreamEdit";
import StreamKey from "./StreamKey";

const Settings = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="columns is-multiline">
          <ProfileSetting />
          <StreamKey />
          <StreamEdit />
        </div>
      </div>
    </div>
  );
};

export default Settings;
