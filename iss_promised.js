const request = require('request-promise-native');

const fetchMyIp = function () {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function (ip) {
  return request("https://freegeoip.app/json/" + JSON.parse(ip).ip);
};

const fetchISSFlyOverTimes = function (coords) {
  coords = JSON.parse(coords);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`)
};

const nextISSTimesForMyLocation = function () {
  return fetchMyIp()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const passes = JSON.parse(data).response;
      return passes;
    });
};

module.exports = { nextISSTimesForMyLocation };