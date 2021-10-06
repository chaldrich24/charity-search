const API_KEY = "ac4aab77f1db8db5e50d166a738d0869";

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
        })
    })
};

getEid();