# PrivateChain
Created own Private Blockchain with Node.js and architect a blockchain data model. Focused on the development of a private chain of blocks which is cryptographically secure and immutable. Created a backend API web service with Express.js Framework that is consumable for client applications.

## Prerequisites
You need to download & install the stable version of [Node.js](https://nodejs.org/). from their website.
Download the [Postman](https://www.getpostman.com/) for the testing PrivateChain API Endpoints.

## Libraries Used
[levelDb](https://github.com/Level/level) - Fast & simple storage - a Node.js-style LevelDB wrapper. <br />
[Crypto-Js](https://github.com/brix/crypto-js) - JavaScript library of crypto standards. <br />
[Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js. <br />
[Express JSON Bodyparser](https://github.com/expressjs/body-parser) - Node.js body parsing middleware. <br />

## Configuring your project
The package.json file has been included in the project. Use NPM to initialize your project and download project dependencies.
```bash
npm install
```

## Testing Blockchain
To run Node server on http://localhost:8000 
```bash
node index.js
```
Running the server will instantiate 10 blocks if the blockchain height is 0.
```javascript
this.getBlockHeight().then(height => {
            //Check if block height is 0
            console.log('Height of Blockchain: ' + height);
            if (height === -1) {
                //Create the Genesis Block - The first block in the blockchain
                this.addBlock(
                    new Block('First block in the chain - Genesis block')
                ).then(() => console.log('Genesis Block created!'))
                    .then(() => this.addBlock(new Block('Second Block')))
                    .then(() => this.addBlock(new Block('Third Block')))
                    .then(() => this.addBlock(new Block('Fourth Block')))
                    .then(() => this.addBlock(new Block('Fifth Block')))
                    .then(() => this.addBlock(new Block('Sixth Block')))
                    .then(() => this.addBlock(new Block('Seventh Block')))
                    .then(() => this.addBlock(new Block('Eight Block')))
                    .then(() => this.addBlock(new Block('Ninth Block')))
                    .then(() => this.addBlock(new Block('Tenth Block')))
            }
        });
```
        
Download and use [Postman](https://www.getpostman.com/) to send the requests to Node server.

To retrieve block use GET with Postman
```
http://localhost:8000/block/$height - Use block height number in place of $height
```
You will retrieve block JSON data at block height 0 : ```http://localhost:8000/block/0```
```json
{
    "hash": "54e3a3bf870a189b954563b615077de329696c0c454d02007f67903b8268a4a0",
    "height": 0,
    "body": "First block in the chain - Genesis block",
    "time": "1541672582",
    "previousBlockHash": ""
}
```

To add new Block to PrivateChain use POST with Postman
```
http://localhost:8000/block
```
Add JSON block data with non-empty string to "body"
```json
{
    "hash": "",
    "height": 0,
    "body": "Add your String data here",
    "time": "0",
    "previousBlockHash": ""
}
```


