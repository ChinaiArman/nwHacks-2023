const express = require('express');
const cors = require('cors')

const app = express();
const port = 5000;


// import controllers
const { notemaker } = require('./controllers/openai.controller');

// Set middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
    // const prompt = req.body.prompt;
    const prompt = "The quick brown fox jumps over the lazy dog.";
    const message = await notemaker(prompt);
    res.json({ notes: message });
})


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})