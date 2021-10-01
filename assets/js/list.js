var charityListEl = document.querySelector("#charity-list");

var getZip = function() {
    var queryString = document.location.search;
    var zipCode = queryString.split("=")[1];
    getCharitiesByZip(zipCode);
}

const API_KEY = "ac4aab77f1db8db5e50d166a738d0869";

function getCharitiesByZip(zip) {
    var url = "https://powerful-retreat-80790.herokuapp.com/http://data.orghunter.com/v1/charitysearch?user_key=" + API_KEY + "&zipCode=" + zip;
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(res => displayCharities(res))
}

var displayCharities = function(data) {
    console.log(data);
    for (i = 0; i < data.data.length; i++) {
        // Create list item container
        var itemContainer = document.createElement("div");
        itemContainer.classList = "is-fullwidth is-medium is-flex is-justify-content-space-between is-align-items-center list-item"

        var nameHolder = document.createElement("div");
        var charityNameEl = document.createElement("h2");
        var categoryEl = document.createElement("h3");

        charityNameEl.classList = "title is-5";
        categoryEl.classList = "subtitle is-6";
        charityNameEl.textContent = data.data[i].charityName;
        charityNameEl.textContent = toProperCase(data.data[i].charityName);
        charityNameEl.classList.add("capitalize"); 
        categoryEl.textContent = data.data[i].category + " - " + data.data[i].city + ", " + data.data[0].state;

        nameHolder.append(charityNameEl, categoryEl);

        var seeMoreEl = document.createElement("button");
        seeMoreEl.classList = "button is-success is-inverted";
        seeMoreEl.textContent = "See More";

        itemContainer.append(nameHolder, seeMoreEl);
        charityListEl.append(itemContainer);
    }
};

var toProperCase = function(str) {
    str = str.toLowerCase();
    console.log(str);
    return str;
};

getZip();