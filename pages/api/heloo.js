import { Configuration, OpenAIApi } from 'openai';

console.log("ye dusre generate mein aa gya")

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// const openai = new OpenAIApi(configuration);


// const basePrefix1 = `\nTarget Audience: `;
// const basePrefix2 = `\nBrand Colors: `;
// const basePrefix3 = '\n Brand Fonts: ';
// const basePrefix4 = `\nImages that can be used:`;
// const basePrefix5 = `\nImage Color :`;
// const basePrefix6 = `\nDesign Style:`;
// const basePrefix7 = `\nCTA Link: `;
// const basePrefix8 = `\n Twitter: `;
// const basePrefix9 = `\n Linkedin: `;
// const basePrefix10 = `\nInstagram: `;
// const basePrefix11= `\nContact: `;

const generateActionSecond = async (req, res) => {
  console.log("Calling open ai from Secondary ")
    const secondPromptCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${req.body.secondaryUserInput}`,
        // I set a higher temperature for this one. Up to you!
        temperature: 0.97,
            // I also increase max_tokens.
        max_tokens: 2500,
      });
      
      console.log("Dusara Output aa gya!")
      // Get the output
      const secondPromptOutput = secondPromptCompletion.data.choices.pop();

    // res.status(200).json({ output: basePromptOutput });
    // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: secondPromptOutput });
};

export default generateActionSecond;