import React from 'react'

import NavMenu from './NavMenu'
import './Header.scss'

const Header = ({ user, setUser, getUser }) => {
  const imageSrc = user && user.image.url ? user.image.url : require('../images/profile-icon.png')
  return (
    <header className="main-header">
      <h1 className='petsitter-name'>petsitter.io</h1>
      <nav>
        { user && <span className="nav-item">hello, {user.email} </span>}
        { user && <img className="nav-item header-profile-pic" alt="profile pic" src={imageSrc} />}
        <NavMenu className="nav-item" getUser={this.getUser} setUser={this.setUser} user={user} />
      </nav>
    </header>
  )
}

export default Header
