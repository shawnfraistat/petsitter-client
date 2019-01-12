import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/edit-profile">Edit Profile</Link>
    {/* Change password is obsolete and should be moved to edit profile
    {/*<Link to="/change-password">Change Password</Link>*/}
    <Link to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link to="/">Home</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <h1>petsitter.io</h1>
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      {/* if user has both a client and sitter account, let user switch between them */}
      { (user && user.isSitter && user.hasClientAcc) && <Link to="/client">Switch to Client View </Link>  }
      { (user && user.isClient && user.hasSitterAcc) && <Link to="/sitter">Switch to Sitter View </Link>  }
      {/* if user doesn't have a client or sitter account, let user create it */}
      { (user && !(user.hasClientAcc)) && <Link to="/create-client-account">Create Client Account</Link> }
      { (user && !(user.hasSitterAcc)) && <Link to="/create-sitter-account">Create Sitter Account</Link> }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header
