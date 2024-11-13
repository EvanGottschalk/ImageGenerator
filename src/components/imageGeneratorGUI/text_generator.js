//--------------------------------------------------------------------------------------------------
//# Imports


// console.log("API Key in image_generator.js:", process.env.OPENAI_API_KEY);



export default { generateText }






//--------------------------------------------------------------------------------------------------
//# Variables













//--------------------------------------------------------------------------------------------------
//# Functions


export async function generateText(prompt, model, provider="OpenAI") {
  let text_output;
  if (provider === "OpenAI") {
    text_output = generateText_OpenAI(prompt, model);
  }

  return(text_output);
}



async function generateText_OpenAI(prompt, model="gpt-3.5-turbo") {
  try {
    const response = await fetch('https://alchm-backend.onrender.com/generate-text', {
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
    console.log("DALL-E Response `data.generated_text`", data.generated_text);
    console.log("DALL-E Response `data.generatedText`", data.generatedText);
    // console.log("DALL-E Response `data.data.imageUrl`", data.data.imageUrl);
    // console.log("DALL-E Response `data.data[0].imageUrl`", data.data[0].imageUrl);
    return(data.generated_text);
  } catch (error) {
      console.error('Error generating image:', error)
  } finally {
      console.log("Done generating image!")
  }

}
