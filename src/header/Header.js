import React from 'react'

import NavMenu from './NavMenu'

import './Header.scss'

// Header is used to display the site's header; contains a nav menu
const Header = ({ user, setUser, getUser }) => {
  const imageSrc = user && user.image.url ? user.image.url : require('../images/profile-icon.png')
  return (
    <header className="main-header">
      <h1 className='petsitter-name'>petsitter.io</h1>
      <nav>
        { user && <span className="nav-item">hello, {user.email} </span>}
        { user && <img className="nav-item header-profile-pic" alt="profile pic" src={imageSrc} />}
        <NavMenu className="nav-item" getUser={getUser} setUser={setUser} user={user} />
      </nav>
    </header>
  )
}

export default Header
