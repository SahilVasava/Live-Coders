import React from "react";
import { Link } from "react-router-dom";

const StreamBlock = (props) => {
  const {
    username,
    avatar,
    Stream: { title },
  } = props.stream;

  return (
    <div className="column is-3">
      <Link to={`/stream/${username}`}>
        <div className="card">
          <div className="card-image">
            <figure className="image is-16by9">
              <img
                src={`http://localhost:4000/thumbnails/${username}.png`}
                alt=""
              />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-left">
                <figure className="image  is-32x32">
                  <img
                    className="is-rounded"
                    //src="https://picsum.photos/200"

                    src={
                      avatar ||
                      "https://res.cloudinary.com/image-dumpd/image/upload/v1626689360/live-coders/user_fk0mbf.png"
                    }
                    // width="28"
                    // height="28"
                    alt="Bulma"
                    style={{ maxHeight: "none", height: "inherit" }}
                  />
                </figure>
              </div>
              <div className="media-content">
                <p className="title is-6">{title}</p>
                <p className="subtitle is-7">{username}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StreamBlock;
