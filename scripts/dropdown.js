var icon = document.querySelector("#icon");
var topicNav = document.querySelector("#topicNav");

// dropdown
icon.addEventListener("click", function (e) {
  topicNav.classList.toggle("show");
});
