import React from 'react'
import './FollowersCard.css'

import {Followers} from '../../Data/followersData'

function FollowersCard() {
  return (
    <div className='FollowersCard'>
        <h3>Who is following you</h3>

        {Followers.map((follwer, id) =>{
            return(
                <div className="follower">
                    <div>
                        <img src={follwer.img} className='followerImg'/>
                        <div className="name">
                            <span>{follwer.name}</span>
                            <span>@{follwer.username}</span>
                        </div>
                    </div>
                    <button className='button fc-button'>
                        Follow
                    </button>
                </div>
            )
        })}
    </div>
  )
}

export default FollowersCard