# string-calculator
REST Endpoint accepting a string simple equation calculation

To start:
npm install
node server.js

Dependencies explanation:
{
    "express": "to handle the REST API",
    "mathjs-expression-parser": "lightweight version of mathjs to calculate the mathematical expression",
    "request": "to test the API with mocha",
    "mocha" : "testing framework",
    "express-session": "use session to store user language option",
    "cookie-parser": "to edit cookie object in user session",
    "i18n": "light-weight i18n translation module"
}