import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signOut } from '../api'
import messages from '../messages'

// SignOut is trigged by the user selecting "Sign Out" fron the nav menu;
// it deletes the user's token on the API, clears local user data, and returns
// them to the root page
class SignOut extends Component {
  componentDidMount () {
    const { flash, history, clearUser, user } = this.props

    signOut(user)
      .finally(() => flash(messages.signOutSuccess, 'flash-success'))
      .finally(() => history.push('/'))
      .finally(() => clearUser())
  }

  render () {
    return ''
  }
}

export default withRouter(SignOut)
