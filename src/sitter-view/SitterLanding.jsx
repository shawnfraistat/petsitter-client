import React from 'react'
import './SitterLanding.scss'

const SitterLanding = (props) => {
  return (
    <div className="landing-div">
      <div className="cat-and-dog-cuddling"><h1 className="welcome-text">Welcome, {props.user.name}!</h1></div>
      <div className="first-div">
        <h3 className="landing-h3">Thank you for creating a sitter account on <span className="petsitter-text">petsitter.io</span>!</h3>
        <p className="landing-page-text">Your info is posted and is already being searched for by thousands&#42; of clients.</p>
        <p className="landing-page-text">Interested clients will be in touch with you via e-mail.</p>
        <p className="landing-page-text">In the meantime, feel free to browse the site, update your profile, or create your own client account and search for sitters.</p>
        <br />
        <br />
        <p>&#42;Not really. On account of this being fake and all.</p>
      </div>
    </div>
  )
}


export default SitterLanding
