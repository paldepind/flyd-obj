var flyd = require('flyd');

exports.streamProps = function(from) {
  var to = {};
  for (var key in from) {
    if (from.hasOwnProperty(key)) {
      to[key] = flyd.stream(from[key]);
    }
  }
  return to;
};

var extractProps = exports.extractProps = function(obj) {
  var newObj = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = flyd.isStream(obj[key]) ? obj[key]() : obj[key];
    }
  }
  return newObj;
};

exports.stream = function(obj) {
  var streams = Object.keys(obj).map(function(key) { return obj[key]; });
  return flyd.stream(streams, function() {
    return extractProps(obj);
  });
};
