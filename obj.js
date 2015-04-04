var flyd = require('flyd');

exports.toStreams = function(obj) {
  var newObj = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = flyd.stream(obj[key]);
    }
  }
  return newObj;
};

exports.extract = function(obj) {
  var newObj = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = 'val' in obj[key] ? obj[key].val : obj[key];
    }
  }
  return newObj;
};
