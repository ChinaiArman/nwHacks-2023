class OpenAIController {
    // constructor() {
    //     this.openai = new OpenAI(process.env.OPENAI_API_KEY);
    // }

    // async complete(prompt, maxTokens, temperature, topP, frequencyPenalty, presencePenalty) {
    //     const response = await this.openai.complete({
    //         engine: 'davinci',
    //         prompt,
    //         maxTokens,
    //         temperature,
    //         topP,
    //         frequencyPenalty,
    //         presencePenalty,
    //         stop: [

    //         ]
    //     });
    //     return response.data.choices[0].text;
    // }

    log() {
        return 'Hello World';
    }

}

module.exports = { OpenAIController };