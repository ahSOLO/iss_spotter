/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");

const fetchMyIP = function(callback) {
  request("https://api.ipify.org?format=json", (error, response, data) => {
    if (error) {
      callback(error, null);
    } else if (response.statusCode > 299 || response.statusCode < 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response ${data}`;
      callback(Error(msg), null);
    } else {
      const ip = JSON.parse(data).ip;
      callback(null, ip);
    }
    return;
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request("https://freegeoip.app/json/" + ip, (error, response, data) => {
    if (error) {
      callback(error, null);
    } else if (response.statusCode > 299 || response.statusCode < 200) {
      const msg = `Status Code ${response.statusCode} when fetching co-ords. Response ${data}`;
      callback(Error(msg), null);
    } else {
      const { latitude, longitude } = JSON.parse(data);
      callback(null, { latitude, longitude });
    }
    return;
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, data) => {
    if (error) {
      callback(error, null);
    } else if (response.statusCode > 299 || response.statusCode < 200) {
      const msg = `Status Code ${response.statusCode} when fetching co-ords. Response ${data}`;
      callback(Error(msg), null);
    } else {
      const passes = JSON.parse(data).response;
      callback(null, passes);
    }
    return;
  });
};


/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP( (error, ip) => {
    if (error) {
      callback(error, null);
    } else {
      fetchCoordsByIP(ip, (error, coords) => {
        if (error) {
          callback(error, null);
        } else {
          fetchISSFlyOverTimes(coords, (error, passes) => {
            if (error) {
              callback(error, null);
            } else {
              callback(null, passes);
            }
          });
        };
      });
    }
  });
  return;
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};