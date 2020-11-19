const sharer = document.querySelector(".sharer");
const shareModal = document.querySelector("#shareModal");
const close = document.getElementById("closeShare");
const quickShare = document.getElementById("quickShare");

var docTitle = document.title;
const url = window.document.location.href;

quickShare.addEventListener("click", function (event) {
  shareModal.classList.add("show");
});

sharer.addEventListener("click", function (event) {
  shareModal.classList.add("show");
});

close.addEventListener("click", function () {
  shareModal.classList.remove("show");
});
