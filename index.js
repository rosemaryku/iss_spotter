const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

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

fetchISSFlyOverTimes(
  { latitude: "43.6426", longitude: "-79.4002" },
  (error, data) => {
    if (error) {
      console.log(`It didn't work! ${error}`);
      return;
    }

    console.log(
      `It worked! The 5 upcoming times that the ISS will fly over the given coorinates and the durations include the following: `,
      data
    );
  }
);
