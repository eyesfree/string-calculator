var express = require('express');
var app  = express();  
var math = require('mathjs-expression-parser');
const hostname = '127.0.0.1';
var port = process.env.PORT || 3333;  

var router = express.Router();  

var i18n = require('i18n');
var session = require('express-session');
var cookieParser = require('cookie-parser');
i18n.configure({
    locales:['en', 'bg', 'de', 'fn'],
    directory: __dirname + 'locales',
    defaultLocale: 'en',
    cookie: 'i18n'
    });
    

app.use(cookieParser("string-calculator"));

app.use(session({
    secret: "string-calculator",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.use(i18n.init);


router.get('/calculate', (req,res) => {
    var lang = req.acceptsLanguages('de', 'en', 'bg', 'fn');
    if (lang) {
        console.log('Spotted supported language:' + lang);
        res.cookie('i18n', lang);
        res.setLocale(req.cookies.i18n); // does not work yet
    }

    if(req.query.input) {
        var result = calculateBase64(req.query.input);
        if(isNaN(result)) {
            res.json({ error: 'true', message: i18n.__("error_calc") + result });
        } else {
            res.json({ error: 'false', result: `${result}` });  
        }     
    } else {
        res.json({ error: 'true', message: i18n.__("no_input") });
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
        return i18n.__("invalid_input")
    }
}
