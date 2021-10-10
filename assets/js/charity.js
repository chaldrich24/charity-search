var newsEl = document.querySelector("#news-container");
var backEl = document.querySelector("#search-results");
var nameEl = document.querySelector("#charity-name");
var infoEl = document.querySelector("#charity-info");
var errorEl = document.querySelector("#error");

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
            displayCharityInfo(data);
        })
    })
    .catch(function() {
        errorEl.textContent = "Error: Unable to connect, please go back and try again"
        errorEl.style.display = "block";
    })
};

var displayCharityInfo = function(data) {
    nameEl.textContent = data.data.name;

    for (i = 0; i < 8; i++) {
        var info = document.createElement("p");
        info.classList = "has-text-white";
        
        switch (i) {
            case 0:
                var property = "EIN";
                var value = data.data.ein;
                break;
            case 1:
                var property = "Ruling Date";
                var value = data.data.rullingDate;
                break;
            case 2:
                var property = "Address";
                var value = data.data.street;
                break;
            case 3:
                var property = "Location";
                var value = data.data.city + ", " + data.data.state;
                break;
            case 4:
                var property = "Organization Type";
                var value = data.data.organization;
                break;
            case 5:
                var property = "Classification";
                var value = data.data.classification;
                break;
            case 6:
                var property = "Related Category";
                var value = data.data.activity1;
                break;
            case 7:
                var property = "Affiliation";
                var value = data.data.affiliation;
            break;
        }

        if (value === null || value === "") {
            value = "Data unavailable";
        }

        info.innerHTML = "<span style='font-weight:bold'>" + property + ": </span>" + value;
        infoEl.appendChild(info);
    }
};

getEid();