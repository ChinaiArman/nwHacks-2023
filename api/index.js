const express = require('express');
const cors = require('cors')

const app = express();
const port = 3000;


// import controllers
const openAi = require('./controllers/openai.controller');
const openAiController = new openAi.OpenAIController();

// Set middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    const message = openAiController.log();
    res.json({ message: message });
})


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})