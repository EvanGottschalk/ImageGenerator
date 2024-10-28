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
    console.log("Current Prompt:", prompt);
  }

  function handleModelChange(event) {
    let model = event.target.value;
    console.log("Selected Model:", model);
  }

  return (
    <div className='imageGeneratorGUI'>
      <div className='imageGeneratorGUILeftContainer'>
        <div className='imageGeneratorGUITextContainer'>
          {/* <div className='imageGeneratorGUIText imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay="100">Co-founder at NoFun Labs</div> */}
          {/* <div className='imageGeneratorGUIText imageGeneratorGUITagline' data-aos="fade-right" data-aos-delay="200" style={{
            textDecoration: 'none',
            color: '#00ef63'}}>- Blockchain Onboarding Solutions -</div> */}
          <div className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay="300" style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Enter Prompt:
          </div>
            <textarea id='imageGeneratorGUIEntry' className='imageGeneratorGUIEntry' data-aos="fade-right" data-aos-delay="300" style={{
              textDecoration: 'none',
              color: '#000000'}} placeholder="Your prompt here..." onChange={handlePromptChange} required/>
          <div className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay="300" style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Select Model:
          </div>
          <select className='imageGeneratorGUI_selectList' id='selectModel' onChange={handleModelChange}>
            <option value="black-forest-labs/FLUX.1-dev">black-forest-labs/FLUX.1-dev</option>
            <option value="black-forest-labs/FLUX.1-dev0">black-forest-labs/FLUX.1-dev</option>
            <option value="black-forest-labs/FLUX.1-dev">black-forest-labs/FLUX.1-dev</option>
          </select>
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
