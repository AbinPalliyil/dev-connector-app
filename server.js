const express = require('express');
const connectDB = require('./config/db')

const app = express();

//Databas connection
connectDB();

app.get('/', (req,res) => {
    res.send("API Running");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is runnign on port ${PORT}`)
})