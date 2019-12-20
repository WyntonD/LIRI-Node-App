var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var spotify = require("node-spotify-api");
var fs = require("fs");
var moment = require("moment");

var command= process.argv[2];
var secondCommand= process.argv[3];

var omdbKey = keys.omdb.api_key;
var spotify = new spotify(
    keys.spotify
);

switch (command) {
  case ('concert-this'):
      concertThis(secondCommand)
  break;
  case ('spotify-this-song'):
      if(secondCommand){
          spotifyThisSong(secondCommand);
       } else{
          spotifyThisSong("The Sign");
       }
  break;
  case ('movie-this'):
      if(secondCommand){
          omdb(secondCommand);
      } else{
          omdb("Crazy, Stupid, Love.");
      }
  break;
  case ('do-what-it-says'):
       doThing();
  break;
  default:
      console.log('Try again');
};

// spotify.search({
//     type: "track", query: "All the Small Things"}, function(err, data){
//         if(err) {
//             return console.log("Error occured: " + err);
//         }
//         console.log(data);
//     }
// )

// spotify
//   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
//   .then(function(data) {
//     console.log(data); 
//   })
//   .catch(function(err) {
//     console.error('Error occurred: ' + err); 
//   });

function spotifyThisSong(song){
  spotify.search({ type: 'track', query: song, limit: 1}, function(error, data){
      if(!error){
      for(var i = 0; i < data.tracks.items.length; i++){
          var songData = data.tracks.items[i];
                    //artist
          console.log("Artist: " + songData.artists[0].name);
                    //song name
          console.log("Song: " + songData.name);
                    //spotify preview link
          console.log("Preview URL: " + songData.preview_url);
                    //album name
          console.log("Album: " + songData.album.name);
          console.log("-----------------------");
          } 
      } else {
      console.log('Error occurred.');
      }
  });
  }


var movieName =process.argv[2];


// function omdb(movie){
//   var omdbURL = 'http://www.omdbapi.com/?t=' + movie + '&apikey=' + omdbKey + '&plot=short&tomatoes=true';

//   axios.get(omdbURL, function (error, response, body){

//   });

// }

function omdb(movie){
axios.get("http://www.omdbapi.com/?t=" + movie + "&apikey" + omdbKey + "&plot=short&apikey=trilogy")
.then(
  function(response) {

      // var body = JSON.parse(body);

      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMdB Rating: " + response.data.imdbRating);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      
      // .catch(function(error) {
      //   if (error.response) {
      //     // The request was made and the server responded with a status code
      //     // that falls out of the range of 2xx
      //     console.log("---------------Data---------------");
      //     console.log(error.response.data);
      //     console.log("---------------Status---------------");
      //     console.log(error.response.status);
      //     console.log("---------------Status---------------");
      //     console.log(error.response.headers);
      //   } else if (error.request) {
      //     // The request was made but no response was received
      //     // `error.request` is an object that comes back with details pertaining to the error that occurred.
      //     console.log(error.request);
      //   } else {
      //     // Something happened in setting up the request that triggered an Error
      //     console.log("Error", error.message);
      //   }
      //   console.log(error.config);
      // });
      


    if(movie === "Mr. Nobody" && !movie){
        var movie ="Mr.Nobody";


      console.log("-----------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");

    }
  }
);
}

function concertThis(value) {
  axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
  .then(function(response) {    
      for (var i = 0; i < response.data.length; i++) {

          var datetime = response.data[i].datetime; 
          var dateArr = datetime.split('T'); 

          var concertResults = 
              "--------------------------------------------------------------------" +
                  "\nVenue Name: " + response.data[i].venue.name + 
                  "\nVenue Location: " + response.data[i].venue.city +
                  "\nDate of the Event: " + moment().subtract(10, 'days').calendar(); //dateArr[0] should be the date separated from the time
          console.log(concertResults);
      }
  })
  .catch(function (error) {
      console.log(error);
  });
      

}


function doThing(){
  fs.readFile('random.txt', "utf8", function(error, data){
    var txt = data.split(',');

    spotifyThisSong(txt[1]);
  });
}

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

