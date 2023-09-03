import React from 'react'
import './ProfileCard.css'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/profileImg.jpg'

function ProfileCard() {
  return (
    <div className='ProfileCard'>
        <div className="ProfileImages">
            <img src={Cover} alt="cover" />
            <img src={Profile} alt="profile" />
        </div>

        <div className="ProfileName">
            <span>Dhiraj</span>
            <span>Full Stack Web Developer</span>
        </div>

        <div className="followStatus">
            <hr />
            <div>
                <div className="follow">
                    <span>10</span>
                    <span>Following</span>
                </div>
                <div className="vl"></div>
                <div className="follow">
                    <span>100</span>
                    <span>Followers</span>
                </div>
            </div>
            <hr />
        </div>

        <span>
            My Profile
        </span>
    </div>
  )
}

export default ProfileCard