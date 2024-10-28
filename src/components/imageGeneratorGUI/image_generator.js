//--------------------------------------------------------------------------------------------------
//# Imports

import { Livepeer } from "@livepeer/ai";

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
  } else if (provider === "DALL-E" || provider === "DALLE") {
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
  
  console.log(result.imageResponse.images);

  return(result.imageResponse.images);
}

async function generateImage_DALLE(prompt, width=1024, height=1024, model="black-forest-labs/FLUX.1-dev") {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
          // ${process.env.OPENAI_API_KEY}
        },
      body: JSON.stringify({
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: "1024x1024"
      })
    })

    const data = await response.json()
    console.log(data);
    //setImage(data.data[0].url)
  } catch (error) {
      console.error('Error generating image:', error)
  } finally {
      console.log("Done generating image!")
  }
}
