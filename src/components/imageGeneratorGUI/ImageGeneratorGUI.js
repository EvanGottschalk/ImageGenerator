import React from 'react'
import image_generator from "./image_generator";

import './imageGeneratorGUI.css'

let image_URL; // make a default image

const ImageGeneratorGUI = () => {

  // const prompt_entry_field = document.querySelector('.imageGeneratorGUIEntry');

  // prompt_entry_field.addEventListener('input', function () {
  //   this.style.height = 'auto';  // Reset height to auto to shrink if needed
  //   this.style.height = this.scrollHeight + 'px';  // Adjust to content height
  // });

  function pause(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

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

  async function handleGenerateClick(event) {
    console.log(">>> handleGenerateClick");
    var prompt = document.getElementById('imageGeneratorGUI_promptEntry').value;
    var model = document.getElementById('selectModel').value;
    
    image_URL = await handleImageGeneration(prompt, model);

    console.log("image_URL:", image_URL);
  }



  async function handleImageGeneration(prompt, model) {
    var image_URL_element = document.getElementById('imageURL');
    var image_title_element = document.getElementById('imageTitle');
    var image_element = document.getElementById('generatedImage');
  
    image_URL_element.innerHTML = "Image URL: Generating";
    image_title_element.innerHTML = "Image: Generating";
    image_element.src = '';
  
    let image_generator_response, image_generator_promise, image_generator_result, x;
    image_generator_response = image_generator.generateImage(prompt, 512, 512, model, "Livepeer");
    
  
    var loop_count = 1;
    var loop = true;
    console.log('len', image_generator_response.length);
    console.log(image_generator_response);
    while ( loop ) {
      await pause(500);
      if (loop_count > 3) {
        image_URL_element.innerHTML = "Image URL: Generating";
        image_title_element.innerHTML = "Image: Generating";
        loop_count = 0;
      } else {
        image_URL_element.insertAdjacentText('beforeEnd', '.');
        image_title_element.insertAdjacentText('beforeEnd', '.');
      }
      loop_count+=1;
      console.log("Loop Count: ", loop_count);
      console.log('len', image_generator_response.length);
      console.log(image_generator_response);
      image_generator_promise = image_generator_response.then((result) => {
        console.log(result);
        if (Array.isArray(result)) {
          loop = false;
          image_generator_result = result;
        };
      });
      console.log('promise', image_generator_promise);
    };
  
    console.log('image_generator_response', image_generator_response);
    const image_URL = image_generator_result[0]['url'];
    image_URL_element.innerHTML = "Image URL: " + image_URL;
    image_title_element.innerHTML = "Image: ";
    image_element.src = image_URL;
  
    return(image_URL);
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
            <textarea id='imageGeneratorGUI_promptEntry' className='imageGeneratorGUIEntry' data-aos="fade-right" data-aos-delay="300" style={{
              textDecoration: 'none',
              color: '#000000'}} placeholder="Your prompt here..." onChange={handlePromptChange} required/>
          <div className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay="300" style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Select Model:
          </div>
          <select className='imageGeneratorGUI_selectList' id='selectModel' onChange={handleModelChange} data-aos="fade-right" data-aos-delay="300" style={{
            textDecoration: 'none'}}>
            <option value="black-forest-labs/FLUX.1-dev">black-forest-labs/FLUX.1-dev</option>
            <option value="black-forest-labs/FLUX.1-dev">black-forest-labs/FLUX.1-dev</option>
            <option value="black-forest-labs/FLUX.1-dev">black-forest-labs/FLUX.1-dev</option>
          </select>
          <input value="Generate" className="imageGeneratorGUI_submitButton" id="generateButton" type="submit" style={{fontSize:18, marginRight:20}} onClick={handleGenerateClick}/>
          <div id='imageURL'className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay="300" style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Image URL: </div>
          <div id='imageTitle' className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay="300" style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Image: </div>
          <img src={image_URL} alt='' id='generatedImage' className='imageGeneratorGUI_generatedImage' />
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
