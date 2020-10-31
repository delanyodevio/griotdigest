var searchIndex = null;
var searchUI = document.querySelector(".search-ui");
var resultsUI = document.querySelector(".search-results-list");
var searchInput = document.querySelector("#searchStr");
var cancelSearch = document.querySelector(".cancel-search");

// clear the current results
var clearResults = function () {
  while (resultsUI.firstChild) {
    resultsUI.removeChild(resultsUI.firstChild);
  }
};

// search and display
var find = function (str) {
  str = str.toLowerCase();

  // look for matches in the JSON
  var results = [];
  for (var item in searchIndex) {
    var found = searchIndex[item].text.indexOf(str);
    if (found != -1) {
      results.push(searchIndex[item]);
    }
  }

  // build and insert the new result entries
  clearResults();
  for (var item in results) {
    var listItem = document.createElement("li");
    var link = document.createElement("a");
    link.textContent = results[item].title;
    link.setAttribute("href", results[item].url);
    listItem.appendChild(link);
    resultsUI.appendChild(listItem);
  }
};

// add an event listener for a click on the search link
searchInput.addEventListener("keyup", function (event) {
  // get the data
  fetch("/search.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      searchIndex = response.search;
    });

  var str = searchInput.value;
  if (str.length > 2) {
    resultsUI.style.display = "block";
    find(str);
  } else {
    resultsUI.style.display = "none";
    clearResults();
  }
});

cancelSearch.addEventListener("click", function () {
  resultsUI.style.display = "none";
  searchInput.value = "";
});
