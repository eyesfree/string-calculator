var request = require('request');
var expect = require('chai').expect;

it('Test if a valid expression gets a good result', function(done) {
    request('http://localhost:3333/v1/calculate?input=MTEgKyAzICogMTAgLTQ=' , function(error, response, body) {
        expect(body).to.be.deep.equal('{"error":"false","result":"37"}');
        done();
    })
});

it('Test if a invalid expression gets a proper error', function(done) {
    request('http://localhost:3333/v1/calculate?input=invalid!!!' , function(error, response, body) {
        expect(body).to.be.deep.equal('{"error":"true","message":"Invalid expression passed as input."}');
        done();
    })
});