import React from "react";
import { Link } from "react-router-dom";

const StreamBlock = (props) => {
  const {
    username,
    Stream: { title },
  } = props.stream;
  return (
    <div className="column is-3">
      <Link to={`/stream/${username}`}>
        <div className="card">
          <div className="card-image">
            <figure className="image is-16by9">
              <img src="https://placeimg.com/640/360/tech" />
            </figure>
          </div>
          <div className="card-content">
            <div className="media-content">
              <p className="title is-6">{title}</p>
              <p className="subtitle is-7">{username}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StreamBlock;
