const request = require("request-promise-native");

const fetchMyIP = function () {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIP = function (body) {
  let ip = JSON.parse(body).ip;
  return request(
    `https://api.freegeoip.app/json/${ip}?apikey=8fd3f740-7a2d-11ec-8e1a-5b4f157c0e01`
  );
};

const fetchISSFlyOverTimes = function (body) {
  let { longitude, latitude } = JSON.parse(body);
  return request(
    `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`
  );
};

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
