var newsEl = document.querySelector("#news-container");
const API_KEY = "ac4aab77f1db8db5e50d166a738d0869";
const NEWS_API_KEY = "a5c2b9e921dbcf681f4356e52f806b05";

var getEid = function() {
    var queryString = document.location.search;
    var splitString = queryString.split("=")[1];
    var ein = splitString.split("?")[0];
    console.log(ein);
    getCharityInfo(ein);
};

var getCharityInfo = function(ein) {
    var url = "https://powerful-retreat-80790.herokuapp.com/http://data.orghunter.com/v1/charitybasic?user_key=" + API_KEY + "&ein=" + ein;
    fetch(url).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            displayNews(data.data.name);
        })
    })
};

var displayNews = function(name) {
    var searchTerm = name.replace(/\s/g, "-");
    console.log(searchTerm);
    var url = "http://api.mediastack.com/v1/news?access_key=" + NEWS_API_KEY + "&languages=en&keywords=" + searchTerm;
    fetch(url).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        })
    })
};

getEid();