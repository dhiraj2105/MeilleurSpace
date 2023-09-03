import React from 'react'
import './Home.css'
import ProfileSide from '../../components/profileSide/ProfileSide'

function Home() {
  return (
    <div className='Home'>
        <ProfileSide />
        <div className='postSide'>Post</div>
        <div className='rightSide'>Right</div>
    </div>
  )
}

export default Home