import React from 'react'

import consultation_image from '../../image/services-image.png'



import './consultation.css'

const Consultation = () => {
  return (
    <div className='consultation'>
      <div className='consultationLeftContainer'>
        <div className='consultationRightTop'>
          <div className='consultationImageContainer'>
            <img src={consultation_image} alt='' className='consultationImage' />
          </div>
        </div>
      </div>
      <div className='consultationRightContainer'>
        <div className='consultationTextContainer'>
          <div className='consultationText' style={{
            textDecoration: 'underline',
            fontSize: '35px'}}>The Bull Market is Coming.</div>
          <div className='consultationText' style={{
            textDecoration: 'none',
            fontSize: '25px'}}>Can you afford to wait?</div>
          <br></br>
          <div className='consultationText' style={{
            textDecoration: 'none',
            fontSize: '15px',
            color: '#444444'}}>Book a 30-minute consultation for $99:</div>
          <br></br>
          <div className='paypalContainer'>
            <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input type="hidden" name="hosted_button_id" value="YCXANRFU4RWSW" />
              <input type="hidden" name="currency_code" value="USD" />
              <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Buy Now" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Consultation
