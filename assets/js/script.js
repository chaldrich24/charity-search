var zipInput = document.getElementById("zip-input");
var zipSubmit = document.getElementById("zip-submit");
var newsButtonsEl = document.querySelector("#news-btns");
var newsContEl = document.querySelector("#news-container");
var prevEl = document.querySelector("#previous-search");
var errorEl = document.querySelector("#error");
var newsErrorEl = document.querySelector("#news-error");

const API_KEY = "ac4aab77f1db8db5e50d166a738d0869";
const NEWS_API_KEY = "a5c2b9e921dbcf681f4356e52f806b05";

function changePage(event) {
    event.preventDefault();
    var zipVal = zipInput.value;

    if (event.target.id === "previous-search") {
        zipVal = prevEl.value;
    }
    
    if(zipVal.length < 5 || isNaN(zipVal)) {
        errorEl.textContent = "Error: Not a valid zip code"
        errorEl.style.display = "block";
        setTimeout(function() {errorEl.style.display = "none"}, 3000);
        zipInput.value = "";
    }

    else {
        saveZip(zipVal);
        document.location.replace("./list-page.html?zip=" + zipVal);
    }
}

var getNews = function(event) {
    if (event.target.type === "button") {
        var buttonArr = newsButtonsEl.children;
        for (i = 0; i < buttonArr.length; i++) {
            buttonArr[i].style.border = "none";
        }

        event.target.style.border = "2px solid #000";

        var offset = getRandomNum(100);
        var url = "http://api.mediastack.com/v1/news?access_key=" + NEWS_API_KEY + "&offset=" + offset + "&sort=popularity&limit=5&languages=en&keywords=" + event.target.textContent;
        fetch(url)
        .then(response => response.json())
        .then(function(data) {
            displayNews(data);
            console.log(data);
        })
        .catch(function() {
            newsErrorEl.textContent = "Error: Unable to connect, please try again"
            newsErrorEl.style.display = "block";
            setTimeout(function() {newsErrorEl.style.display = "none"}, 4000);
            zipInput.value = "";
        })
    }
}


var getRandomNum = function(total) {
    var number = Math.floor(Math.random() * (total));
    return number;
}

var displayNews = function(news) {
    newsContEl.innerHTML = "";

    for (i = 0; i < news.data.length; i++) {
        var newsTitle = document.createElement("p");
        newsTitle.textContent = news.data[i].title;
        newsTitle.style.fontWeight = "bold";
        newsTitle.classList = "is-size-5";

        var newsAuthor = document.createElement("p");
        if (news.data[i].author === null || news.data[i].author === "") {
            newsAuthor.textContent = "By: " + news.data[i].source;
        }

        else {
            newsAuthor.textContent = "By: " + news.data[i].author;
        }

        var newsArticleEl = document.createElement("div");
        newsArticleEl.classList = "news-article is-flex is-flex-direction-column";

        var newsAnchor = document.createElement("a");
        newsAnchor.setAttribute("href", news.data[i].url);
        newsAnchor.setAttribute("target", "_blank");

        newsArticleEl.append(newsTitle, newsAuthor);
        newsAnchor.appendChild(newsArticleEl);
        newsContEl.appendChild(newsAnchor);
    }
}

var saveZip = function(zip) {
    localStorage.setItem("zip", zip);
}

var loadZip = function() {
    if (localStorage.getItem("zip") === null) {
        return false;
    }

    var zip = localStorage.getItem("zip");
    prevEl.textContent = "Previously Searched: " + zip;
    prevEl.setAttribute("value", zip);
    prevEl.style.display = "inline-block";
}

loadZip();

zipSubmit.addEventListener("click", changePage);
newsButtonsEl.addEventListener("click", getNews);
prevEl.addEventListener("click", changePage);