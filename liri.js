// Javascript file for LIRI-bot Node assignment

const dotenv = require("dotenv").config();
const Spotify = require("node-spotify-api");
const keys = require("./keys.js");
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");

let spotify = new Spotify(keys.spotify);

let input = process.argv;
let command = process.argv[2];
let searchInput = "";

/* For Loop to take in the console input and convert it to a new variable */
for (i = 3; i < input.length; i++) {
    if (i > 3 && i < input.length) {
        searchInput += searchInput + "+" + input[i];
    } else { 
        searchInput += input[i];
    }
    console.log(searchInput)
}

function doSpotify(searchInput) {

}

function doBandsInTown(searchInput) {

}

function doOMDB(searchInput) {

}

function doWhatItSays() {

}

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
}

/* Link for BIT API
"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp" */