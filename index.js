const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It works! Returned IP:", ip);
// });

// fetchCoordsByIP("45.61.99.19", (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned coordinates:", coordinates);
// });

// fetchISSFlyOverTimes(
//   { latitude: "43.6426", longitude: "-79.4002" },
//   (error, data) => {
//     if (error) {
//       console.log(`It didn't work! ${error}`);
//       return;
//     }

//     console.log(
//       `It worked! The 5 upcoming times that the ISS will fly over the given coorinates and the durations include the following: `,
//       data
//     );
//   }
// );

// FINAL FUNCTION
const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});
