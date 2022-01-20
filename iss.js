/* Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require("request");

const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  request(
    "https://api.ipify.org?format=json",
    function (error, response, body) {
      if (error) {
        return callback(error, null);
      }

      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(error(msg), null);
        return;
      }

      const ip = JSON.parse(body).ip;
      callback(null, ip);
    }
  );
};

const fetchCoordsByIP = (ip, callback) => {
  request(
    `https://api.freegeoip.app/json/${ip}?apikey=8fd3f740-7a2d-11ec-8e1a-5b4f157c0e01`,
    function (error, response, body) {
      if (error) {
        return callback(error, null);
      }

      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }

      let { latitude, longitude } = JSON.parse(body);
      callback(null, { latitude, longitude });
    }
  );
};

const fetchISSFlyOverTimes = (coordinates, callback) => {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;

  request(url, function (error, response, body) {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS flyover times for coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    let data = JSON.parse(body).response;
    callback(null, data);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
