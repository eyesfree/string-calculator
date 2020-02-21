var express = require('express');
var app  = express();  
var math = require('mathjs-expression-parser');
const hostname = '127.0.0.1';
var port = process.env.PORT || 3333;  

var router = express.Router();  

router.get('/calculate', (req,res) => {
    if(req.query.input) {
        console.log('Processing: ' + req.query.input);
        var b = new Buffer(req.query.input, 'base64');
        var s = b.toString();
        console.log('Decoded exression: ' + s);
        var result = math.eval(s);
        console.log('Result: ' + result);
        res.json({ error: 'false', result: `${result}` });
    } else {
        res.json({ error: 'true', message: 'No input property set' });
    }
});

app.use('/v1', router);


app.listen(port);
console.log(`String calculator running at http://${hostname}:${port}/`);
