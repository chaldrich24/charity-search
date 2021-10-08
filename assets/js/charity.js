var newsEl = document.querySelector("#news-container");
var backEl = document.querySelector("#search-results");
var nameEl = document.querySelector("#charity-name");
var infoEl = document.querySelector("#charity-info");

const API_KEY = "087d90e10dc627fdf0b4f716aacb3e60";
const NEWS_API_KEY = "a5c2b9e921dbcf681f4356e52f806b05";

var getEid = function() {
    var queryString = document.location.search;
    var splitString = queryString.split("=")[1];
    var ein = splitString.split("?")[0];
    var zip = queryString.split("=")[2];
    console.log(ein);
    console.log(zip);
    backEl.setAttribute("href", "./list-page.html?zip=" + zip);
    getCharityInfo(ein);
};

var getCharityInfo = function(ein) {
    var url = "https://powerful-retreat-80790.herokuapp.com/http://data.orghunter.com/v1/charitybasic?user_key=" + API_KEY + "&ein=" + ein;
    fetch(url).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            displayNews("charity");
            displayCharityInfo(data);
        })
    })
};

var displayCharityInfo = function(data) {
    nameEl.textContent = data.data.name;
    var location = document.createElement("p");
    location.textContent = "Location: " + data.data.city + ", " + data.data.state;
    infoEl.appendChild(location);
};

getEid();