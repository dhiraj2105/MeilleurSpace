import React from 'react'
import './Home.css'
import ProfileSide from '../../components/profileSide/ProfileSide'
import PostSide from '../../components/postSide/PostSide'

function Home() {
  return (
    <div className='Home'>
        <ProfileSide />
        <PostSide />
        <div className='rightSide'>Right</div>
    </div>
  )
}

export default Home