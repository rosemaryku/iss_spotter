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

module.exports = { fetchMyIP };
