import React from 'react'
import './LandingPage.scss'

// <div className="man-and-dog"><</div>
// <img className="man-and-dog" src={require('./images/man-and-dog.jpg')} />

const LandingPage = () => {
  return (
    <div className="landing-div">
      <div className="man-and-dog"><h1 className="welcome-text">Welcome to petsitter.io!</h1></div>

      <img width="200" height="200" src={require('./images/cat-and-dog.jpg')} />
      <img width="200" height="200" src={require('./images/hi-five-kitten.jpg')} />
      <img width="200" height="200" src={require('./images/woman-and-bird.jpg')} />
      <p>Here&apos;s a description.</p>
    </div>
  )
}

export default LandingPage
