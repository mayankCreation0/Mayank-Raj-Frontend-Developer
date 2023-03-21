import React from 'react'
import '../Styles/About.css'
import Footer from './Footer'
function About() {
  return (
    <div className="about-container" id='about'>
      <h1 className="about-title">About SpaceX</h1>
      <p className="about-description">SpaceX is a private American aerospace manufacturer and space transportation services company founded in 2002 by entrepreneur Elon Musk with the goal of reducing space transportation costs and enabling the colonization of Mars.</p>
      <p className="about-description">SpaceX has developed the Falcon 1, Falcon 9, Falcon Heavy, and Dragon spacecraft. With the Falcon 9 and Falcon Heavy, SpaceX is able to reuse the first stage of the rocket, significantly reducing the cost of space launches.</p>
      <h2 className="about-subtitle">Our Mission</h2>
      <p className="about-description">At SpaceX, our mission is to make life multiplanetary. We believe that by expanding the human presence beyond Earth, we can ensure the survival of the human species and inspire future generations to pursue science and exploration.</p>
      <h2 className="about-subtitle">Our Achievements</h2>
      <ul className="about-list">
        <li>First privately funded company to send a spacecraft to the International Space Station (2012)</li>
        <li>First privately funded company to send a satellite into geosynchronous orbit (2013)</li>
        <li>First privately funded company to launch, orbit, and recover a spacecraft (2014)</li>
        <li>First reusable rocket to successfully land vertically on a landing pad (2015)</li>
        <li>First privately funded company to launch a spacecraft into orbit around the Sun (2018)</li>
        <li>First privately funded company to send humans to space and return them safely to Earth (2020)</li>
      </ul>
      <Footer />
    </div>
  )
}

export default About
