// Javascript file for LIRI-bot Node assignment

require("dotenv").config();
const spotify =  require("node-spotify-api");
const keys = require("./keys.js");
const axios = require("axios");
const fs = require("fs");
const moment = require("moment");

let input = process.argv;
let command = process.argv[2];
let searchInput = "";

for (i = 3; i < input.length; i++) {
    if (i > 3 && i < input.length) {
        searchInput += searchInput + "+" + input[i];
    } else { 
        searchInput += input[i];
    }
    console.log(searchInput)
}

if (searchInput !== "") {
    let userInput = command + ":"
}

/* Link for BIT API
"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp" */