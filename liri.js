// Javascript file for LIRI-bot Node assignment

require("dotenv").config();
var Spotify = require("node-spotify-api");
const keys = require("./keys.js");
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
const request = require("request");

let spotify = new Spotify(keys.spotify);

let command = process.argv[2];
    // Turns the array of search terms into a single string seperated by '+'
let searchInput = process.argv.slice(3).join("+");

    /* Spotify API function */
function doSpotify(input) {
    if (input === "") {
        var song = "the+sign+ace+of+base";
    } else {
        var song = input;
    }
    spotify.search({
        type: "track",
        query: song,
        limit: 1
    }, function(error, response) {
        if (error) {
            console.log("Error: " + error);
        } else {
            console.log("* - * - * - * - * - * - * - * - *");
            console.log("Artist(s): " + response.tracks.items[0].artists[0].name);
            console.log("Track: " + response.tracks.items[0].name);
            console.log("Preview Link: " + response.tracks.items[0].preview_url);
            console.log("Album: " + response.tracks.items[0].album.name);
            console.log("* - * - * - * - * - * - * - * - *");
        };
    });
};

    /* BandsInTown function */
function doBandsInTown(input) {
    if (input === "") {
        var artist = "john+mayer";
    } else {
        var artist = input;
    }
    let url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(url).then(function(response) {
        console.log("* - * - * - * - * - * - * - * - *");
        console.log("Venue: " + response.data[0].venue.name);
        console.log("Location: " + response.data[0].venue.city);
        console.log("Time: " + (moment(response.data[0].datetime)).format("MM/DD/YYYY"));
        console.log("* - * - * - * - * - * - * - * - *");
    });
};

    /* OMDB function */
function doOMDB(input) {
    if (input === "") {
        var movie = "mr+nobody";
    } else {
        var movie = input;
    }
    let url = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
        // Using request module, because axios threw multiple errors using their API,
        // and I wanted to practice a different module.
    request(url, function(error, response, body) {
        if (error) {
            console.log("Error: " + error);
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
        };
    });
};

    /* Calls the text in random.txt*/
function doWhatItSays() {
    fs.readFile("./random.txt", "utf8", function(error, response) {
        if (error) {
            console.log("Error: " + error);
        } else {
                // Splits the string, seperated by a comma, into an array.
            let data = response.split(",");
            var comDo = data[0]
            var searchDo = data[1];
            LIRIswitch(comDo, searchDo);
        };
    });
};

function LIRIswitch(command, searchInput) {
    switch(command) {
        case "spotify-this-song":
            doSpotify(searchInput);
            break;
        case "concert-this":
            doBandsInTown(searchInput);
            break;
        case "movie-this":
            doOMDB(searchInput);
            break;
        default:
            break;
    };
};

/* Switch statment that uses the command variable to run the correct function. */
if (command === "do-what-it-says") {
    doWhatItSays(searchInput);
} else {
    LIRIswitch(command, searchInput);
};

