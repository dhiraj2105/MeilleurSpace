import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../actions/UserAction";

function User({ person }) {
  const dispatch = useDispatch();
  const serverPublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );

  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(person._id, user))
      : dispatch(followUser(person._id, user));

    setFollowing((prev) => !prev);
  };

  return (
    <div className="follower">
      <div>
        <img
          src={
            person.coverPicture
              ? serverPublicFolder + person.profilePicture
              : serverPublicFolder + "defaultProfile.png"
          }
          className="followerImg"
        />
        <div className="name">
          <span>{person.firstname}</span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnFollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "UnFollow" : "Follow"}
      </button>
    </div>
  );
}

export default User;
