var assert = require('assert');
var flyd = require('flyd');
var stream = flyd.stream;

var obj = require('../obj.js');

describe('stream props', function() {
  it('converts the properties in an object to streams', function() {
    var o = {one: 1, two: 2, three: 3};
    var oS = obj.streamProps(o);
    assert.equal(o.one, oS.one());
    assert.equal(o.two, oS.two());
    assert.equal(o.three, oS.three());
  });
});
describe('stream object', function() {
  var o = {one: 1, two: 2, three: 3};
  it('returns a stream', function() {
    var oS = obj.stream(obj.streamProps(o));
    assert(flyd.isStream(oS));
  });
  it('flow unwrapped object down stream when props change', function() {
    var oS = obj.streamProps(o);
    var result = [];
    flyd.map(function(o) { result.push(o); }, obj.stream(oS));
    oS.one(4);
    oS.three(4);
    oS.two(4);
    assert.deepEqual(result, [
      {one: 1, two: 2, three: 3},
      {one: 4, two: 2, three: 3},
      {one: 4, two: 2, three: 4},
      {one: 4, two: 4, three: 4},
    ]);
  });
});
describe('extract', function() {
  it('extracts the values from streams in object', function() {
    var oS = {one: stream(1), two: stream(2), three: stream(3)};
    var o = obj.extractProps(oS);
    assert.equal(o.one, oS.one());
    assert.equal(o.two, oS.two());
    assert.equal(o.three, oS.three());
  });
  it('handles values that are not streams', function() {
    var oS = {one: stream(1), undef: undefined, nll: null, two: 2};
    var o = obj.extractProps(oS);
    assert.equal(o.one, oS.one());
    assert.equal(o.undef, oS.undef);
    assert.equal(o.nll, oS.nll);
    assert.equal(o.two, oS.two);
  });
});
