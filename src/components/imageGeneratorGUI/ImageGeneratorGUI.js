import React from 'react'
import image_generator from "./image_generator";
import text_generator from "./text_generator";

import './imageGeneratorGUI.css'

let image_URL; // make a default image
let generated_text = '...';
let provider = "Livepeer";

const model_dict = {"black-forest-labs/FLUX.1-dev": {"description": "FLUX.1 defines the new state-of-the-art in image synthesis. Our models set new standards in their respective model class. FLUX.1 [pro] and [dev] surpass popular  models like Midjourney v6.0, DALL·E 3 (HD) and SD3-Ultra in each of the following aspects: Visual Quality, Prompt Following, Size/Aspect Variability, Typography and Output Diversity. FLUX.1 [schnell] is the most advanced few-step model to date, outperforming not even its in-class competitors but also strong non-distilled models like Midjourney v6.0 and DALL·E 3 (HD) .  Our models are specifically finetuned to preserve the entire output diversity from pretraining.",
                                                     "link": "https://blackforestlabs.ai/announcing-black-forest-labs/"},
                    "SG161222/Realistic_Vision_V6.0_B1_noVAE": {"description":  "Latest (experimental) release of the Realistic Vision model specialized in creating photorealistic portraits.",
                                                     "link": "https://huggingface.co/SG161222/Realistic_Vision_V6.0_B1_noVAE"},
                    "stabilityai/stable-diffusion-xl-base-1.0": {"description": "A base model for stable diffusion by Stability AI.",
                                                     "link": "https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0"},
                    "runwayml/stable-diffusion-v1-5": {"description": "A stable diffusion model by Runway ML.",
                                                     "link": "https://huggingface.co/runwayml/stable-diffusion-v1-5"},
                    "prompthero/openjourney-v4": {"description": "A model by Prompthero for open-ended journey generation.",
                                                     "link": "https://huggingface.co/prompthero/openjourney-v4"},
                    "ByteDance/SDXL-Lightning": {"description": "A lightning-fast diffusion model by ByteDance.",
                                                     "link": "https://huggingface.co/ByteDance/SDXL-Lightning"},
                    "SG161222/RealVisXL_V4.0": {"description": "A diffusion model that excels in generating high-quality, photorealistic images.",
                                                     "link": "https://huggingface.co/SG161222/RealVisXL_V4.0"},
                    "SG161222/RealVisXL_V4.0_Lightning": {"description": "A streamlined version of RealVisXL_V4.0, designed for faster inference while still aiming for photorealism.",
                                                     "link": "https://huggingface.co/SG161222/RealVisXL_V4.0_Lightning"},
                    "DALL-E": {"description": "[COMING SOON] Text-to-image generation powered by OpenAI and ChatGPT.",
                                                     "link": "https://openai.com/index/dall-e-3/"}}

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

    if (model === "DALL-E") {
      provider = "OpenAI";
    } else {
      provider = "Livepeer";
    };
    console.log("Selected Model:", model);
    console.log("document.getElementById('modelDescription').innerHTML", document.getElementById('modelDescription').innerHTML);
    console.log("document.getElementById(event.target.alt)", document.getElementById(event.target.alt));
    document.getElementById('modelDescription').innerHTML = model_dict[model]['description'];
    document.getElementById('modelLink').href = model_dict[model]['link'];
  }

  async function handleGenerateClick(event) {
    console.log(">>> handleGenerateClick");
    var prompt = document.getElementById('imageGeneratorGUI_promptEntry').value;
    var model = document.getElementById('selectModel').value;
    
    if (event.target.id === 'generateImageButton') {
      image_URL = await handleImageGeneration(prompt, model);
      console.log("image_URL:", image_URL);
    } else if (event.target.id === 'generateTextButton') {
      // let image_generator_response, image_generator_promise, image_generator_result, x;
      generated_text = await handleTextGeneration(prompt, model);
      console.log("generated_text", generated_text);
      
    }
  }

  
  // async function handleTextGeneration(prompt, model) {
  //   console.log('\nImageGeneratorGUI >>> RUNNING handleTextGeneration()');
  //   let text_output_element = document.getElementById('textOutput');
  //   try {
  //     const response = await fetch('https://alchm-backend.onrender.com/generate-text', {
  //       method: 'POST',
  //       headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       body: JSON.stringify({ prompt })
  //     })
  
  //     if (!response.ok) {
  //       throw new Error(`Server error: ${response.status}`);
  //     }
  
  //     const data = await response.json()
  
  
  //     console.log("DALL-E Response `data`", data);
  //     // console.log("DALL-E Response `data.imageUrl`", data.imageUrl);
  //     // console.log("DALL-E Response `data.data.imageUrl`", data.data.imageUrl);
  //     // console.log("DALL-E Response `data.data[0].imageUrl`", data.data[0].imageUrl);
  //     generated_text = data;

  //     console.log('generated_text', generated_text);
  //     console.log('generated_text[generated_text]', generated_text['generated_text']);

  //     text_output_element.innerHTML = generated_text['generated_text'];

  //     return(generated_text['generated_text']);
      
  //   } catch (error) {
  //       console.error('Error generating text:', error)
  //   } finally {
  //       console.log("Done generating text!")
  //   }

    
  // };

  async function handleTextGeneration(prompt, model) {
    console.log('\nImageGeneratorGUI >>> RUNNING handleTextGeneration()');
    
    let text_output_element = document.getElementById('textOutput');
    // let text_title_element = document.getElementById('textTitle');
  
    text_output_element.innerHTML = "Generating";
    // text_title_element.innerHTML = "Generated Text: Generating";
  
    let text_generator_response, text_generator_promise, text_generator_result;
    text_generator_response = text_generator.generateText(prompt, "gpt-3.5-turbo", "OpenAI");
    
  
    var loop_count = 1;
    var loop = true;
    console.log('len', text_generator_response.length);
    console.log(text_generator_response);
    while ( loop ) {
      await pause(500);
      if (loop_count > 3) {
        text_output_element.innerHTML = "Generating";
        loop_count = 0;
      } else {
        text_output_element.insertAdjacentText('beforeEnd', '.');
      }
      loop_count+=1;
      console.log("Loop Count: ", loop_count);
      console.log('len', text_generator_response.length);
      console.log(text_generator_response);
      text_generator_promise = text_generator_response.then((result) => {
        console.log(result);
        // if (Array.isArray(result)) {
        //   loop = false;
        //   text_generator_result = result;
        // };
        if (typeof result === 'string') {
          loop = false;
          text_generator_result = result;
        };
      });
      console.log('promise', text_generator_promise);
    };

    console.log('text_generator_response', text_generator_response);
    console.log('text_generator_response[generated_text]', text_generator_response['generated_text']);
    // const text_URL = text_generator_result[0]['url'];

    if (model === 'DALL-E') {
      text_generator_result = text_generator_result['generated_text']
    };


    generated_text = text_generator_result;
    text_output_element.innerHTML = generated_text;
    // text_title_element.innerHTML = "text: ";
  
    return(generated_text);

  };



  // async function generateImage_DALLE(prompt, width=1024, height=1024, model="black-forest-labs/FLUX.1-dev") {
  //   try {
  //     const response = await fetch('https://alchm-backend.onrender.com/generate-image', {
  //       method: 'POST',
  //       headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       body: JSON.stringify({ prompt })
  //     })
  
  //     if (!response.ok) {
  //       throw new Error(`Server error: ${response.status}`);
  //     }
  
  //     const data = await response.json()
  
  
  
  
  //     console.log("DALL-E Response `data`", data);
  //     console.log("DALL-E Response `data.imageUrl`", data.imageUrl);
  //     // console.log("DALL-E Response `data.data.imageUrl`", data.data.imageUrl);
  //     // console.log("DALL-E Response `data.data[0].imageUrl`", data.data[0].imageUrl);
  //     return(data.imageUrl);
  //   } catch (error) {
  //       console.error('Error generating image:', error)
  //   } finally {
  //       console.log("Done generating image!")
  //   }
  
  // }



  async function handleImageGeneration(prompt, model) {
    var image_URL_element = document.getElementById('imageURL');
    var image_title_element = document.getElementById('imageTitle');
    var image_element = document.getElementById('generatedImage');
  
    image_URL_element.innerHTML = "Image URL: Generating";
    image_title_element.innerHTML = "Image: Generating";
    image_element.src = '';
  
    let image_generator_response, image_generator_promise, image_generator_result, x;
    image_generator_response = image_generator.generateImage(prompt, 512, 512, model, provider);
    
  
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
        // if (Array.isArray(result)) {
        //   loop = false;
        //   image_generator_result = result;
        // };
        if (typeof result === 'string') {
          loop = false;
          image_generator_result = result;
        };
      });
      console.log('promise', image_generator_promise);
    };
  
    console.log('image_generator_response', image_generator_response);
    console.log('image_generator_response[image_URL]', image_generator_response['image_URL']);
    // const image_URL = image_generator_result[0]['url'];

    if (model === 'DALL-E') {
      image_generator_result = image_generator_result['image_URL']
    };


    image_URL = image_generator_result;
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
            <textarea id='imageGeneratorGUI_promptEntry' className='imageGeneratorGUI_promptEntry' data-aos="fade-right" data-aos-delay="300" style={{
              textDecoration: 'none',
              color: '#000000'}} placeholder="Your prompt here..." onChange={handlePromptChange} required/>
          <div className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay="300" style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Select Model:
          </div>
          <select className='imageGeneratorGUI_selectList' id='selectModel' onChange={handleModelChange} data-aos="fade-right" data-aos-delay="300" style={{
            textDecoration: 'none'}}>
            <option value="black-forest-labs/FLUX.1-dev">black-forest-labs/FLUX.1-dev</option>
            <option value="SG161222/Realistic_Vision_V6.0_B1_noVAE">SG161222/Realistic_Vision_V6.0_B1_noVAE</option>
            <option value="stabilityai/stable-diffusion-xl-base-1.0">stabilityai/stable-diffusion-xl-base-1.0</option>
            <option value="runwayml/stable-diffusion-v1-5">runwayml/stable-diffusion-v1-5</option>
            <option value="prompthero/openjourney-v4">prompthero/openjourney-v4</option>
            <option value="ByteDance/SDXL-Lightning">ByteDance/SDXL-Lightning</option>
            <option value="SG161222/RealVisXL_V4.0">SG161222/RealVisXL_V4.0</option>
            <option value="SG161222/RealVisXL_V4.0_Lightning">SG161222/RealVisXL_V4.0_Lightning</option>
            <option value="DALL-E">DALL-E (coming soon)</option>
          </select>
          <div className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay="300" style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Model Description:
          </div>
          <div className='imageGeneratorGUI_modelDescription' id='modelDescription' data-aos="fade-right" data-aos-delay="300">FLUX.1 defines the new state-of-the-art in image synthesis. Our models set new standards in their respective model class. FLUX.1 [pro] and [dev] surpass popular  models like Midjourney v6.0, DALL·E 3 (HD) and SD3-Ultra in each of the following aspects: Visual Quality, Prompt Following, Size/Aspect Variability, Typography and Output Diversity. FLUX.1 [schnell] is the most advanced few-step model to date, outperforming not even its in-class competitors but also strong non-distilled models like Midjourney v6.0 and DALL·E 3 (HD) .  Our models are specifically finetuned to preserve the entire output diversity from pretraining.</div>
          <a href="https://blackforestlabs.ai/announcing-black-forest-labs/" target='_blank' className='imageGeneratorGUI_modelLink' id='modelLink' data-aos="fade-right" data-aos-delay="300"><u>Learn More -></u></a>
          <input value="Generate Text" className="imageGeneratorGUI_submitButton" id="generateTextButton" type="submit" data-aos="fade-right" data-aos-delay="300" style={{
            fontSize:18, marginRight:20}} onClick={handleGenerateClick}/>
          <div id='textTitle' className='imageGeneratorGUITitle' data-aos="fade-right" data-aos-delay="300" style={{
            textDecoration: 'none',
            color: '#bbbbbb'}}>Generated Text:</div>
          <div className='imageGeneratorGUI_modelDescription' id='textOutput' data-aos="fade-right" data-aos-delay="300">...</div>
          <input value="Generate Image" className="imageGeneratorGUI_submitButton" id="generateImageButton" type="submit" data-aos="fade-right" data-aos-delay="300" style={{
            fontSize:18, marginRight:20}} onClick={handleGenerateClick}/>
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
