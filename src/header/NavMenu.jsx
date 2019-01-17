import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple'

TouchRipple.prototype.render = () => null

const styles = theme => ({
  iconButton: {
    '&:hover': {
      backgroundColor: 'white'
    }
  },
  menu: {
    top: '82px',
    width: '300px'
  },
})

const authenticatedOptions = [
  (<MenuItem key="edit-profile" onClick={this.handleClose}><Link to="/edit-profile">Edit Profile</Link></MenuItem>),
  (<MenuItem key="sign-out" onClick={this.handleClose}><Link to="/sign-out">Sign Out</Link></MenuItem>)
]


const unauthenticatedOptions = [
  (<MenuItem key="sign-up" onClick={this.handleClose}><Link to="/sign-up">Sign Up</Link></MenuItem>),
  (<MenuItem key="sign-in" onClick={this.handleClose}><Link to="/sign-in">Sign In</Link></MenuItem>)
]


const alwaysOptions = (
  <MenuItem onClick={this.handleClose}><Link to="/">Home</Link></MenuItem>
)

class NavMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state
    const { user, classes } = this.props

    console.log('this.props is', this.props)
    const switchToClient = (setUser, getUser) => {
      const user = getUser()
      user.account_type = 'client'
      setUser(user)
    }

    const switchToSitter = (setUser, getUser) => {
      const user = getUser()
      user.account_type = 'sitter'
      setUser(user)
    }

    return (
      <div>
        <IconButton
          className={classes.iconButton}
          aria-owns={anchorEl ? 'nav-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MenuIcon className={classes.menuButton}/>
        </IconButton>
        <Menu
          id="nav-menu"
          className={classes.menu}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          { (user && user.isClient) && (<MenuItem onClick={this.handleClose}><Link to="/client">Search Sitters</Link></MenuItem>)}
          {/* if user has both a client and sitter account, let user switch between them */}
          { (user && user.isSitter && user.hasClientAcc) && (<MenuItem onClick={this.handleClose}><Link to="/client" onClick={() => switchToClient(setUser, getUser)}>Switch to Client View</Link></MenuItem>) }
          { (user && user.isClient && user.hasSitterAcc) && (<MenuItem onClick={this.handleClose}><Link to="/sitter" onClick={() => switchToSitter(setUser, getUser)}>Switch to Sitter View</Link></MenuItem>) }
          {/* if user doesn't have a client or sitter account, let user create it */}
          { (user && !(user.hasClientAcc)) && (<MenuItem onClick={this.handleClose}><Link to="/create-client-account">Create Client Account</Link></MenuItem>) }
          { (user && !(user.hasSitterAcc)) && (<MenuItem onClick={this.handleClose}><Link to="/create-sitter-account">Create Sitter Account</Link></MenuItem>) }
          { user ? authenticatedOptions : unauthenticatedOptions }
          { alwaysOptions }
        </Menu>
      </div>
    )
  }
}

export default withStyles(styles)(NavMenu)
