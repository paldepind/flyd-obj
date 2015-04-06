var flyd = require('flyd');

function wrapProps(from, to) {
  for (var key in from) {
    if (from.hasOwnProperty(key)) {
      to[key] = flyd.stream(from[key]);
    }
  }
  return to;
}

exports.streamProps = function(obj) {
  return wrapProps(obj, {});
};

exports.extractProps = function extract(obj) {
  var newObj = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = flyd.isStream(obj[key]) ? obj[key].val : obj[key];
    }
  }
  return newObj;
};

function update(s, keys) {
  var obj = {};
  keys.map(function(key) {
    obj[key] = s[key].val;
  });
  s(obj);
}

exports.stream = function(obj) {
  var s = flyd.stream();
  wrapProps(obj, s);
  var keys = Object.keys(obj);
  var upd = update.bind(null, s, keys);
  keys.map(function(key) {
    flyd.map(upd, s[key]);
  });
  return s;
};
