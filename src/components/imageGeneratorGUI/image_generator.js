//--------------------------------------------------------------------------------------------------
//# Imports

import { Livepeer } from "@livepeer/ai";

// console.log("API Key in image_generator.js:", process.env.REACT_APP_OPENAI_API_KEY);



export default { generateImage }






//--------------------------------------------------------------------------------------------------
//# Variables

const livepeerAI = new Livepeer({
  httpBearer: "",
});












//--------------------------------------------------------------------------------------------------
//# Functions


export async function generateImage(prompt, width, height, model, provider="Livepeer") {
  let image_URL;
  if (provider === "Livepeer") {
    image_URL = generateImage_Livepeer(prompt, width, height, model);
  } else if (provider === "OpenAI") {
    image_URL = generateImage_DALLE(prompt, width, height, model);
  }

  return(image_URL);
}


async function generateImage_Livepeer(prompt, width=1024, height=1024, model="black-forest-labs/FLUX.1-dev") {
  const result = await livepeerAI.generate.textToImage({
    prompt: prompt,
    modelId: model,
    width: width,
    height: height
  });
  
  console.log("Livepeer result.imageResponse.images", result.imageResponse.images);
  console.log("Livepeer Image URL:", result.imageResponse.images[0]['url']);

  return(result.imageResponse.images[0]['url']);
}

async function generateImage_DALLE(prompt, width=1024, height=1024, model="black-forest-labs/FLUX.1-dev") {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
      body: JSON.stringify({
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: "1024x1024"
      })
    })

    const data = await response.json()
    console.log("DALL-E Response `data`", data);
    console.log("DALL-E Image URL:", data.data[0].url);
    return(data.data[0].url);
  } catch (error) {
      console.error('Error generating image:', error)
  } finally {
      console.log("Done generating image!")
  }

}
