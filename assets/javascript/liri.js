var axios = require("axios");
 
var movieName = process.argv[2];

var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"

console.log(queryURL);

axios.get(queryURL).then(function(response){
    console.log("Title " + response.data.Title);
}

);