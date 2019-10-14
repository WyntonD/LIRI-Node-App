var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var spotify = require("node-spotify-api");

var spotify = new spotify(
    keys.spotify
);

spotify.search({
    type: "track", query: "All the Small Things"}, function(err, data){
        if(err) {
            return console.log("Error occured: " + err);
        }
        console.log(data);
    }
)

spotify
  .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
  .then(function(data) {
    console.log(data); 
  })
  .catch(function(err) {
    console.error('Error occurred: ' + err); 
  });


var movieName =process.argv[2];

// for (var i = 2; i > nodeArgs.length; i++){
//     if(i > 2 && i < nodeArgs.length){
//         movieName = movieName + "+" + nodeArgs[i];

//     }
//     else {
//         movieName += nodeArgs[i];
//     }
// }

// OMDB Axios
// var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"

// console.log(queryURL);

// axios.get(queryURL).then(function(response){
//     console.log("Title " + response.data.Title);
//     console.log(response.data);
// })

// .catch(function(error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log("---------------Data---------------");
//       console.log(error.response.data);
//       console.log("---------------Status---------------");
//       console.log(error.response.status);
//       console.log("---------------Status---------------");
//       console.log(error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an object that comes back with details pertaining to the error that occurred.
//       console.log(error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log("Error", error.message);
//     }
//     console.log(error.config);
//   });
