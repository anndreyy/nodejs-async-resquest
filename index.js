const express = require('express')
const app = express()

/**
 * statusProcessing: 
 * 1 - ready
 * 2 - processing
 * 3 - processed
 */
var statusProcessing = 1;

app.get('/async', (req, res) => {

    switch (statusProcessing) {
        case 1:
            statusProcessing = 2;
            processA();
        case 2:
            res.status(202).send('Processing');
            break;
        case 3:
            statusProcessing = 1;
            res.status(200).send('Processed');
        break;
    }
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${port}`)
})


async function processA(){
    console.log('Processing');

    var interval = setInterval(() => {
        console.log('Processing', Date.now());
    }, 1000)

    await sleep(60000 * 60 * 2);

    statusProcessing = 3;
    
    clearInterval(interval);
    console.log('Processed');
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
