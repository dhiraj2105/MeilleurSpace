import React, { useEffect, useState } from "react";
import "./FollowersCard.css";

// import { Followers } from "../../Data/followersData";
import User from "../User/User";
import { useSelector } from "react-redux";
import { getAllUser } from "../../api/UserRequest";

function FollowersCard() {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
      // console.log(data);
    };
    fetchPersons();
  }, []);

  return (
    <div className="FollowersCard">
      <h3>Peoples you may know</h3>

      {persons.map((person, id) => {
        if (persons._id !== user._id) {
        }
        return <User person={person} key={id} />;
      })}
    </div>
  );
}

export default FollowersCard;
