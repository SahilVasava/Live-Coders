import React from "react";
import StreamEdit from "./StreamEdit";
import StreamKey from "./StreamKey";

const Settings = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="columns is-multiline">
          <StreamKey />
          <StreamEdit />
        </div>
      </div>
    </div>
  );
};

export default Settings;
