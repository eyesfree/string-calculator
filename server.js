var express = require('express');
var app  = express();  
var math = require('mathjs-expression-parser');
const hostname = '127.0.0.1';
var port = process.env.PORT || 3333;  

var router = express.Router();  

router.get('/calculate', (req,res) => {
    if(req.query.input) {
        var result = calculateBase64(req.query.input);
        if(isNaN(result)) {
            res.json({ error: 'true', message: 'Calculation error: ' + result });
        } else {
            res.json({ error: 'false', result: `${result}` });  
        }     
    } else {
        res.json({ error: 'true', message: 'No input property set' });
    }
});

app.use('/v1', router);


app.listen(port);
console.log(`String calculator running at http://${hostname}:${port}/`);

function calculateBase64(userInput) {
    console.log('Processing: ' + userInput);
    var input = new Buffer(userInput, 'base64');
    var decoded = input.toString();
    console.log('Decoded exression: ' + decoded);
    var sanitized = decoded.replace(/[^-()\d/*+.]/g, '');
    console.log('Sanitized exression: ' + sanitized);

    if(sanitized) {
        try {
            var result = math.eval(sanitized);
            console.log('Result: ' + result);
            return result;       
        }
        catch (err) {
            return err;
        }
    } else {
        return 'Invalid expression passed as input.'
    }
}

