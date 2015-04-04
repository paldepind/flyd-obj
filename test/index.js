var assert = require('assert');
var flyd = require('flyd');
var stream = flyd.stream;

var obj = require('../obj.js');

describe('to streams', function() {
  it('converts the properties in an object to streams', function() {
    var o = {one: 1, two: 2, three: 3};
    var oS = obj.toStreams(o);
    assert.equal(o.one, oS.one());
    assert.equal(o.two, oS.two());
    assert.equal(o.three, oS.three());
  });
  it('extracts the values from streams in object', function() {
    var oS = {one: stream(1), two: stream(2), three: stream(3)};
    var o = obj.extract(oS);
    assert.equal(o.one, oS.one());
    assert.equal(o.two, oS.two());
    assert.equal(o.three, oS.three());
  });
});
