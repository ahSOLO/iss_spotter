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
      callback(null, coords);
    }
    return;
  });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
};