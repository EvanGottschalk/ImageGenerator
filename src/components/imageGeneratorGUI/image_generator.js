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
    const response = await fetch('https://alchm-backend.onrender.com/generate-image', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({ prompt })
    })

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json()




    console.log("DALL-E Response `data`", data);
    console.log("DALL-E Response `data.imageUrl`", data.imageUrl);
    // console.log("DALL-E Response `data.data.imageUrl`", data.data.imageUrl);
    // console.log("DALL-E Response `data.data[0].imageUrl`", data.data[0].imageUrl);
    return(data.imageUrl);
  } catch (error) {
      console.error('Error generating image:', error)
  } finally {
      console.log("Done generating image!")
  }

}
