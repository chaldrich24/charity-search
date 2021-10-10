var charityListEl = document.querySelector("#charity-list");
var errorEl = document.querySelector("#error");
const API_KEY = "087d90e10dc627fdf0b4f716aacb3e60";

var getZip = function() {
    var queryString = document.location.search;
    var zipCode = queryString.split("=")[1];
    getCharitiesByZip(zipCode);
}

function getCharitiesByZip(zip) {
    var url = "https://powerful-retreat-80790.herokuapp.com/http://data.orghunter.com/v1/charitysearch?user_key=" + API_KEY + "&eligible=1&zipCode=" + zip;
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(res => displayCharities(res))
    .catch(function() {
        errorEl.textContent = "Error: Unable to connect, please go back and try again"
        errorEl.style.display = "block";
    })
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
        categoryEl.textContent = data.data[i].category + " - " + data.data[i].city + ", " + data.data[0].state;

        nameHolder.append(charityNameEl, categoryEl);

        var seeMoreEl = document.createElement("button");
        seeMoreEl.classList = "button is-success is-inverted";
        seeMoreEl.textContent = "See More...";
        seeMoreEl.setAttribute("ein", data.data[i].ein);
        seeMoreEl.setAttribute("type", "button")
        itemContainer.append(nameHolder, seeMoreEl);
        charityListEl.append(itemContainer);
    }
};

var seeCharityDetails = function(event) {
    if (event.target.type === "button") {
        var ein = event.target.getAttribute("ein");
        var queryString = document.location.search;
        var zipCode = queryString.split("=")[1];
        console.log(ein);
        document.location.replace("./charity.html?ein=" + ein + "?zipcode=" + zipCode);
    }
};

getZip();
charityListEl.addEventListener("click", seeCharityDetails);