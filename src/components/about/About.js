import React from 'react'

import about_image from '../../image/about-image.png'



import './about.css'

const About = () => {

  function mouseOver(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.20)';
  }
  
  function mouseLeave(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.0)';
  }

  return (
    <div className='about'>
      <div className='aboutLeftContainer'>
        <div className='aboutTextContainer'>
          <div className='aboutText aboutTitle' data-aos="fade-right" data-aos-delay="100">Co-founder at NoFun Labs</div>
          <div className='aboutText aboutTagline' data-aos="fade-right" data-aos-delay="200" style={{
            textDecoration: 'none',
            color: '#00ef63'}}>- Blockchain Onboarding Solutions -</div>
          <div className='aboutText' data-aos="fade-right" data-aos-delay="300" style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Start onboarding your next 1,000,000 users now:</div>
          <a data-aos="flip-down" data-aos-delay="0" href='https://evanon.earth/nofunlabs' target="_blank" 
          className='aboutText aboutLink' id='nofunlabsLink' onMouseOver={mouseOver} onMouseLeave={mouseLeave} style={{
            textDecoration: 'none',
            color: '#7CE2F9'}}>Learn More -></a>
          <br></br>
          <div className='aboutText aboutTitle' data-aos="fade-right" data-aos-delay="500">Web3 Engineer at Aphid AI</div>
          <div className='aboutText aboutTagline' data-aos="fade-right" data-aos-delay="600" style={{
            textDecoration: 'none',
            color: '#00F8BE'}}>- Decentralized Bot Marketplace -</div>
          <div className='aboutText' data-aos="fade-right" data-aos-delay="700" style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Exponentiate your efficiency with bots that work for you:</div>
          <a data-aos="flip-down" data-aos-delay="0" href='https://evanon.earth/aphid' target="_blank" 
          className='aboutText aboutLink' id='aphidLink' onMouseOver={mouseOver} onMouseLeave={mouseLeave} style={{
            textDecoration: 'none',
            color: '#7CE2F9'}}>Learn More -></a>
          <br></br>
          <div className='aboutText aboutTitle' data-aos="fade-right" data-aos-delay="900">Blockchain Architect at EcoVerse</div>
          <div className='aboutText aboutTagline' data-aos="fade-right" data-aos-delay="1000" style={{
            textDecoration: 'none',
            color: '#ea49ff'}}>- NFT Ticketing & Events Platform -</div>
          <div className='aboutText' data-aos="fade-right" data-aos-delay="1100" style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Engage attendees with free event photos, minted as NFTs:</div>
          <a data-aos="flip-down" data-aos-delay="0" href='https://evanon.earth/ecoverse' target="_blank" 
          className='aboutText aboutLink' id='ecoverseLink' onMouseOver={mouseOver} onMouseLeave={mouseLeave} style={{
            textDecoration: 'none',
            color: '#7CE2F9'}}>Learn More -></a>
          <br></br>
          <div data-aos="fade-right"  data-aos-delay="1300" className='aboutText aboutTitle'>Advisor at BrightID</div>
          <div data-aos="fade-right" data-aos-delay="1400" className='aboutText aboutTagline' style={{
            textDecoration: 'none',
            color: '#ff9500'}}>- Decentralized Identity Protocol -</div>
          <div data-aos="fade-right" data-aos-delay="1500" className='aboutText' style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Your identity, your privacy, all in your custody. No "orb" required:</div>
          <a data-aos="flip-down" data-aos-delay="0" href='https://evanon.earth/brightid' target="_blank"
          className='aboutText aboutLink' id='brightidLink' onMouseOver={mouseOver} onMouseLeave={mouseLeave} style={{
            textDecoration: 'none',
            color: '#7CE2F9'}}>Learn More -></a>
          <br></br>
          <div data-aos="fade-right" data-aos-delay="1700" className='aboutText aboutTitle'>Advisor at Unitap</div>
          <div data-aos="fade-right" data-aos-delay="1800" className='aboutText aboutTagline' style={{
            textDecoration: 'none',
            color: '#31a3ff'}}>- Universal Token Distribution Platform -</div>
          <div data-aos="fade-right" data-aos-delay="1900" className='aboutText' style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Grow your dapp's userbase with free gas and token raffles:</div>
          <a data-aos="flip-down" data-aos-delay="00" href='https://evanon.earth/unitap' target="_blank"
          className='aboutText aboutLink' id='unitapLink' onMouseOver={mouseOver} onMouseLeave={mouseLeave} style={{
            textDecoration: 'none',
            color: '#7CE2F9'}}>Learn More -></a>
        </div>
      </div>
      <div className='aboutRightContainer'>
        <div className='aboutRightTop'>
          <div className='aboutImageContainer'>
            <img data-aos="fade-left" src={about_image} alt='' className='aboutImage' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
