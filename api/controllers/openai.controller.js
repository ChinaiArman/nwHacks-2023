const { Configuration, OpenAIApi } = require("openai");


const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);


async function notemaker(article) {
    if (!configuration.apiKey) {
        return "OpenAI API key not configured, please follow instructions in README.md";
    }

    if (article.trim().length === 0) {
        return "Please enter a prompt";
    }

    try {
        const completion = await openai.createCompletion({
            model: "text-curie-001",
            prompt: generatePrompt(article),
            temperature: 1,
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 1,
        });
        return completion.data.choices[0].text;
    } catch (error) {
        if (error.response) {
            console.error(error.response.status, error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
        }
    }
}

// generatePrompt function that takes in a string that is being used as a prompt for the OpenAI API.
function generatePrompt(article) {
    return `Article: ${article}
  Summarize with bullet points, keep statistical details:`;
}


module.exports = { notemaker }