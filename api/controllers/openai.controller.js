const { Configuration, OpenAIApi } = require("openai");

// Import the Configuration and OpenAIApi classes from the openai package

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Create an instance of the Configuration class with the API key from the environment variable.
// Create an instance of the OpenAIApi class with the configuration instance.

export default async function (req, res) {
    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message:
                    "OpenAI API key not configured, please follow instructions in README.md",
            },
        });
        return;
    }

    // Check if the configuration instance has an apiKey property. If not, return an error message.

    const article = req.body.article || "";
    if (article.trim().length === 0) {
        res.status(400).json({
            error: {
                message: "Please enter a valid animal",
            },
        });
        return;
    }

    // Get the animal parameter from the request body and check if it is a valid input. If not, return an error message.

    try {
        // const completion = await openai.createCompletion({
        //   model: "text-davinci-003",
        //   prompt: generatePrompt(animal),
        //   temperature: 0.6, // 0.6 is the default value
        // });
        const completion = await openai.createCompletion({
            model: "text-curie-001",
            prompt: generatePrompt(article),
            temperature: 1, // 0.7 is the default value
            max_tokens: 60,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 1,
        });
        res.status(200).json({ result: completion.data.choices[0].text });
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: "An error occurred during your request.",
                },
            });
        }
    }
}

// generatePrompt function that takes in a string that is being used as a prompt for the OpenAI API.
function generatePrompt(article) {
    return `Article: ${article}
  Summarize with bullet points, keep statistical details:`;
}

// function generatePrompt(animal) {
//   const capitalizedAnimal =
//     animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//   return `Suggest three names for an animal that is a superhero.

// Animal: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// Animal: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// Animal: ${capitalizedAnimal}
// Names:`;
// }