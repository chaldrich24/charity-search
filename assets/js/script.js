var zipInput = document.getElementById("zip-input")
var zipSubmit = document.getElementById("zip-submit")

const API_KEY = "ac4aab77f1db8db5e50d166a738d0869"

zipSubmit.addEventListener("click", function(event) {
    // event.preventDefault();
    var zipVal = zipInput.value;
    if(zipVal.length <= 0) {
        alert("very bad")
    }
    else {
        getCharitiesByZip(zipVal)
    }
})

function getCharitiesByZip(zip) {
    var url = "https://powerful-retreat-80790.herokuapp.com/http://data.orghunter.com/v1/charitysearch?user_key=" + API_KEY + "&szipCode=" + zip;
    fetch(url)
    .then(response => response.json())
    .then(res => console.log(res))
}