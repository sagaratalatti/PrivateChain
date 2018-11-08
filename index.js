const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Block = require('./block');
const PrivateChain = require('./privateChain');

const privateChain = new PrivateChain();

app.listen(8000, function () {
    console.log('Deployed at port 8000')
});
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.status(201).json({
        "status": 201,
        "message": "Private Blockchain API: " +
            "Download https://www.getpostman.com/ and use Postman to test API " +
            "To GET block data use http://localhost:8000/block/$blockHeight " +
            "To POST new block use http://localhost:8000/block/ + JSON block data with non-empty string "
    })
});

//GET endpoint that responds to a request using a URL path with a block height parameter: http://localhost:8000/block/$height
app.get('/block/:height', async (req, res) => {
    try {
        // Requesting block details through privateChain levelDb
        const response = await privateChain.getBlock(req.params.height);
        res.send(response)
    } catch (error) {
        //If height out of bounds catch error with 404
        res.status(404).json({
            "status": 404,
            "message": "Oops! No block found!"
        })
    }
});

//POST endpoint that allows posting a new block with the data payload option to add data to the block body
app.post('/block', async (req, res) => {
    //Check if body string is empty or undefined.
    if (req.body.body === '' || req.body.body === undefined) {
        //Notify user to add string value to body parameter
        res.status(400).json({
            "status": 400,
            message: "Oops! Hope you are using JSON format with non-empty String for body"
        })
    }
    //Add new block to the privateChain.
    await privateChain.addBlock(new Block(req.body.body));
    //Get current block height from privateChain.
    const height = await privateChain.getBlockHeight();
    //Retrieve current block data from privateChain.
    const response = await privateChain.getBlock(height);

    res.status(201).send(response)
});