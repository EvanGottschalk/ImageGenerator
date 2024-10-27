import React from 'react'; 

import home_banner from '../../image/banner-home.png'

import './banner.css'

const Banner = () => {
  

  return (
    <div className='bannerContainer'>
      <div className='banner'>
        <img data-aos="fade-left" src={home_banner} alt='' className='banner' />
      </div>
    </div>
  )
}

export default Banner