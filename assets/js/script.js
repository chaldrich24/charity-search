var getCharityData = function() {
    var apiUrl = "https://data.orghunter.com/v1/charitysearch?user_key=087d90e10dc627fdf0b4f716aacb3e60&searchTerm=treasure%20coast%20humane";
    var apiUrlNav = "https://api.data.charitynavigator.org/v2/Organizations?app_id=72650fd4&app_key=06944884fe137960277486619c548a17&zip=20148";
    var apiUrlEin = "https://api.data.charitynavigator.org/v2/Organizations/135563001?app_id=72650fd4&app_key=06944884fe137960277486619c548a17";

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });


};

getCharityData();