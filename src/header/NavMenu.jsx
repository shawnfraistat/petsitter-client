import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core/styles'

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
    margin: '0'
  },
  menuItem: {
    width: '200px'
  }
})


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
    const { user, classes, history, getUser, setUser } = this.props

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

    const authenticatedOptions = [
      (<MenuItem className={classes.menuItem} key="edit-profile" onClick={() => history.push('/edit-profile')}><Link to="/edit-profile">Edit Profile</Link></MenuItem>),
      (<MenuItem className={classes.menuItem} key="sign-out" onClick={() => history.push('/sign-out')}><Link to="/sign-out">Sign Out</Link></MenuItem>)
    ]


    const unauthenticatedOptions = [
      (<MenuItem className={classes.menuItem} key="sign-up"onClick={() => history.push('/sign-up')}><Link to="/sign-up">Sign Up</Link></MenuItem>),
      (<MenuItem className={classes.menuItem} key="sign-in" onClick={() => history.push('/sign-in')}><Link to="/sign-in">Sign In</Link></MenuItem>)
    ]


    const alwaysOptions = (
      <MenuItem className={classes.menuItem} onClick={() => history.push('/')}><Link to="/">Home</Link></MenuItem>
    )

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
          { (user && user.isClient) && (<MenuItem className={classes.menuItem} onClick={() => history.push('/client')}><Link to="/client">Search Sitters</Link></MenuItem>)}
          { (user && user.isSitter) && (<MenuItem className={classes.menuItem} onClick={() => history.push('/sitter')}><Link to="/client">Info for Sitters</Link></MenuItem>)}
          {/* if user has both a client and sitter account, let user switch between them */}
          { (user && user.isSitter && user.hasClientAcc) && (<MenuItem className={classes.menuItem} onClick={() => history.push('/client')}><Link to="/client" onClick={() => switchToClient(setUser, getUser)}>Switch to Client View</Link></MenuItem>) }
          { (user && user.isClient && user.hasSitterAcc) && (<MenuItem  className={classes.menuItem}  onClick={() => history.push('/sitter')}><Link to="/sitter" onClick={() => switchToSitter(setUser, getUser)}>Switch to Sitter View</Link></MenuItem>) }
          {/* if user doesn't have a client or sitter account, let user create it */}
          { (user && !(user.hasClientAcc)) && (<MenuItem className={classes.menuItem}  onClick={() => history.push('/create-client-account')}><Link to="/create-client-account">Create Client Account</Link></MenuItem>) }
          { (user && !(user.hasSitterAcc)) && (<MenuItem className={classes.menuItem}  onClick={() => history.push('/create-sitter-account')}><Link to="/create-sitter-account">Create Sitter Account</Link></MenuItem>) }
          { user ? authenticatedOptions : unauthenticatedOptions }
          { alwaysOptions }
        </Menu>
      </div>
    )
  }
}

const NavStyles = withStyles(styles)(NavMenu)
export default withRouter(NavStyles)
