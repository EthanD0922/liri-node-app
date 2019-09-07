require("dotenv").config();
var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require("moment");

var method = process.argv[2];
var input = process.argv.slice(3).join(" ");



switch(method) {
    case "concert-this":
        concert();
        break;
    
    case "spotify-this-song":
        song();
        break;
    
    case "movie-this":
        movie();
        break;
    
    case "do-what-it-says":
        whatItSays();
        break;
    default:
        console.log("this is not an option. please select a method")

    }

function concert(){
    input = input || "Shakey Graves"
    var queryURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"

    axios.get(queryURL).then(function(res){
        var info = res.data[0]
        console.log(
            "Venue Name: " + info.venue.name +
            "\nCity: " + info.venue.city +
            "\nDate: " + moment(info.datetime).format("MM/DD/YY")   
        )
    })
}

function song(){
    input = input || "The Sign"
    spotify.search({
        type: "track",
        query: input
        }).then(function(res){
            var track = res.tracks.items[0]
            console.log(
                "Name: " + track.name,
                "\nArtist: " + track.artists[0].name,
                "\nAlbum: " + track.album.name,
                "\nListen: " + track.preview_url
            )
        })
}

function movie(){
        input = input || "Mr. Nobody"
        var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy"
    console.log(queryUrl)
        axios.get(queryUrl).then(function(res){
            var movie = res.data
            console.log(
                "Title: " + movie.Title,
                "\nYear: " + movie.Year,
                "\nIMDB Rating: " + movie.imdbRating,
                "\nRotten Tomatoes Rating: " + movie.Ratings[1].Value,
                "\nCountry: " + movie.Country,
                "\nLanguage: " + movie.Language,
                "\nPlot: " + movie.Plot,
                "\nCast: " + movie.Actors,
                
                )
        })
}

function whatItSays(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if(err){
            return console.log(err)
        }
        data = data.split(",");
        method = data[0];
        input = data[1];
        song();
    })
}