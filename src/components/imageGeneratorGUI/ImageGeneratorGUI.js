import React from 'react'



import './imageGeneratorGUI.css'

const ImageGeneratorGUI = () => {

  // const prompt_entry_field = document.querySelector('.imageGeneratorGUIEntry');

  // prompt_entry_field.addEventListener('input', function () {
  //   this.style.height = 'auto';  // Reset height to auto to shrink if needed
  //   this.style.height = this.scrollHeight + 'px';  // Adjust to content height
  // });

  function mouseOver(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.20)';
  }
  
  function mouseLeave(event) {
    let element = document.getElementById(event.target.id);
    element.style.transform = 'scale(1.0)';
  }

  function handlePromptChange(event) {
    let prompt = event.target.value;
  }

  return (
    <div className='imageGeneratorGUI'>
      <div className='imageGeneratorGUILeftContainer'>
        <div className='imageGeneratorGUITextContainer'>
          {/* <div className='imageGeneratorGUIText imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay="100">Co-founder at NoFun Labs</div> */}
          {/* <div className='imageGeneratorGUIText imageGeneratorGUITagline' data-aos="fade-right" data-aos-delay="200" style={{
            textDecoration: 'none',
            color: '#00ef63'}}>- Blockchain Onboarding Solutions -</div> */}
          <div className='imageGeneratorGUIText' data-aos="fade-right" data-aos-delay="300" style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Enter Prompt:
          </div>
            <textarea id='imageGeneratorGUIEntry' className='imageGeneratorGUIEntry' data-aos="fade-right" data-aos-delay="300" style={{
              textDecoration: 'none',
              color: '#000000'}} placeholder="Your prompt here..." onChange={handlePromptChange} required/>
          {/* <a data-aos="flip-down" data-aos-delay="0" href='https://evanon.earth/nofunlabs' target="_blank" 
          className='imageGeneratorGUIText imageGeneratorGUILink' id='nofunlabsLink' onMouseOver={mouseOver} onMouseLeave={mouseLeave} style={{
            textDecoration: 'none',
            color: '#7CE2F9'}}>Learn More -></a> */}
        </div>
      </div>
    </div>
  )
}

export default ImageGeneratorGUI
