const { nextISSTimesForMyLocation } = require("./iss_promised");

const printPassTimes = function (passTimes) {
  const datetime = new Date(0);
  datetime.setUTCSeconds(passTimes[0].risetime);
  const duration = passTimes[0].duration;
  console.log(`Next pass at ${datetime} for ${duration} seconds!`);
}

nextISSTimesForMyLocation()
  .then((passes) => {
    printPassTimes(passes);
  })
  .catch((error) => {
    console.log("Error:", error)
  })