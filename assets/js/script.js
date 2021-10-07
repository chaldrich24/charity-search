var zipInput = document.getElementById("zip-input");
var zipSubmit = document.getElementById("zip-submit");
var newsButtonsEl = document.querySelector("#news-btns");
var newsContEl = document.querySelector("#news-container");

const API_KEY = "ac4aab77f1db8db5e50d166a738d0869";
const NEWS_API_KEY = "a5c2b9e921dbcf681f4356e52f806b05";

zipSubmit.addEventListener("click", changePage);

function getCharitiesByZip(zip) {
    var url = "https://powerful-retreat-80790.herokuapp.com/http://data.orghunter.com/v1/charitysearch?user_key=" + API_KEY + "&szipCode=" + zip;
    fetch(url)
    .then(response => response.json())
    .then(res => console.log(res))
}

function changePage(event) {
    event.preventDefault();
    var zipVal = zipInput.value;
    if(zipVal.length <= 0) {
        alert("very bad")
    }
    else {
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

newsButtonsEl.addEventListener("click", getNews);