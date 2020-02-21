var sum = require('../calculateBase64');
var expect = require('chai').expect;


it('should return sum of arguments', function() {
    var base64expression = 'MTEgKyAzICogMTAgLTQ=';
    expect(calculateBase64(base64expression)).to.equal(37);
});

it('Main page content', function(done) {
    request('http://localhost:3333/v1/calculate?input=MTEgKyAzICogMTAgLTQ=' , function(error, response, body) {
        expect(body).to.equal({"error":"false","result":"37"});
        done();
    })
});