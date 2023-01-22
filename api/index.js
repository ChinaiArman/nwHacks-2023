const express = require('express');
const cors = require('cors')

const app = express();
const port = 5000;


// import controllers
const openAiController = require('./controllers/openai.controller');

// Set middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    console.log('banana')
    const message = openAiController.complete("Authorization is the process of granting an integration access to a user’s Notion data. That process varies depending on whether or not the integration is public or internal. For specifics on the differences between public and internal integrations, refer to the getting started overview. Read on to learn how to set up the auth flows for internal and public integrations.");
    console.log('apple')
    console.log(message)
    console.log('orange')
    res.json({ message: message });
})


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})