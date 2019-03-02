// Javascript file for LIRI-bot Node assignment

require("dotenv").config();

const Spotify = require("node-spotify-api");
const keys = require("./keys.js");
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
const request = require("request");

let spotify = new Spotify(keys.spotify);

let input = process.argv;
let command = process.argv[2];
let searchInput = "";

    /* For Loop to take in the console input and convert it to a new variable */
for (i = 3; i < input.length; i++) {
        /* Checks if multiple words follow the command, and adds a "+" instead of spaces. */
    if (i > 3 && i < input.length) {
        searchInput = searchInput + "+" + input[i];
    } else {
        searchInput += input[i];
    };
};

function doSpotify() {
    let song = searchInput;
    spotify.search({
        type: "track",
        query: song,
        limit: 1
    }, function(err, response) {

    });
};

    /* BandsInTown function */
function doBandsInTown() {
    let artist = searchInput;
    let url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(url).then(function(response) {
        console.log("* - * - * - * - * - * - * - * - *");
        console.log("Venue: " + response.data[0].venue.name);
        console.log("Location: " + response.data[0].venue.city);
        console.log("Time: " + (moment(response.data[0].datetime)).format("MM/DD/YYYY"));
        console.log("* - * - * - * - * - * - * - * - *");
    });
};

function doOMDB() {
    if (searchInput === "") {
        var movie = "mr+nobody";
    } else {
        var movie = searchInput;
    }
    let url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    request(url, function(err, response, body) {
        if (err) {
            console.log(err);
        } else {
            console.log("* - * - * - * - * - * - * - * - *");
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
        console.log("Country: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
        console.log("* - * - * - * - * - * - * - * - *"); 
        }
    });
};

function doWhatItSays() {

};

/* Switch statment that uses the command variable to run the correct function. */
switch(command) {
    case "spotify-this-song":
        doSpotify();
        break;
    case "concert-this":
        doBandsInTown();
        break;
    case "movie-this":
        doOMDB();
        break;
    case "do-what-it-says":
        doWhatItSays;
        break;
    default:
        break;
};