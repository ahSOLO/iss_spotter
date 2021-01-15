const {
  fetchMyIP,
  fetchCoordsByIP
} = require('./iss');

// let fetchedIp = "";

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("Error Fetching IP" , error);
//     return;
//   }
//   console.log('IP Successfully Fetched:' , ip);
//   fetchedIp = ip;
// });

// fetchCoordsByIP(fetchedIp, (error, data) => {
//   if (error) {
//     console.log("Error fetching co-ords", error);
//     return;
//   }
//   console.log("Co-ords successfully fetched: ", data);
// })



// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });