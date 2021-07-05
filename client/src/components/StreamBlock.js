import React from "react";
import { Link } from "react-router-dom";

const StreamBlock = () => {
  return (
    <div className="column is-3">
      <Link to="/stream/sahil">
        <div className="card">
          <div className="card-image">
            <figure className="image is-16by9">
              <img src="https://placeimg.com/640/360/tech" />
            </figure>
          </div>
          <div className="card-content">
            <div className="media-content">
              <p className="title is-6">Live coding a startup</p>
              <p className="subtitle is-7">sahil_vasava</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StreamBlock;
