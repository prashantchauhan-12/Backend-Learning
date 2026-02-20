const express = require('express');
const { registerUserValidationRules } = require('./middlewares/validation.middleware');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello, World!"
    })
})

app.post('/register', registerUserValidationRules, (req, res) => {
    const { username, email, password } = req.body;
    res.status(200).json({
        message: "User registered successfully"
    })
})

module.exports = app;