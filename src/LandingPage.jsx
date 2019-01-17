import React from 'react'
import './LandingPage.scss'

const LandingPage = () => {
  return (
    <div className="landing-div">
      <div className="man-and-dog"><h1 className="welcome-text">Welcome</h1></div>
      <div className="first-question-div">
        <h3 className="about landing-h3">About</h3>
        <div className="text-div">
          <p className="landing-page-text"><span className="petsitter-text">petsitter.io</span> was founded by a man with a simple dream, a dream of being able to easily find a pet sitter without having to beg friends for favors.</p>
          <p className="landing-page-text">So he created this site, which allows pet sitters to post their information and email address, and clients to search for sitters who match their specifications.</p>
          <p className="landing-page-text">If you want to use this site as a sitter, it&apos;s as simple as signing up and waiting for the e-mails to roll in. As for clients, they can sign up and search away!</p>
        </div>
      </div>
      <div className="row second-question-div">
        <img className="cat-and-dog" alt="cat and dog" src={require('./images/cat-and-dog.jpg')} />
        <div className="cat-and-dog-text">
          <h3 className="cared-for landing-h3">Will My Pets Be Well Cared-For?</h3>
          <p className="landing-page-text">If this were a real site, absolutely.</p>
        </div>
      </div>
      <div className="third-question-div">
        <h3 className="landing-h3">Are the Sitters on This Site Verified By &nbsp;<span className="petsitter-text">petsitter.io</span>?</h3>
        <div className="row verified-div">
          <div className="verified-text-div">
            <p className="landing-page-text">Yes.&#42; You can contact a sitter knowing that our qualified team has verified that they will take good care of your pets.</p>
            <br />
            <br />
            &#42; No. This isn&apos;t real. If any of our sitters actually respond to your emails, run.
          </div>
          <img className="high-five-kitten" alt="kitten high-fiving" src={require('./images/high-five-kitten.jpg')} />
        </div>
      </div>
    </div>
  )
}

export default LandingPage
