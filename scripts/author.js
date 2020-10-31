// fetch user data when the page loads
window.addEventListener("DOMContentLoaded", function () {
  // Grab the social anchor tags
  let tw = document.querySelector(".tw-anchor"),
    fb = document.querySelector(".fb-anchor"),
    ins = document.querySelector(".ins-anchor"),
    editedBio = document.querySelector(".edited-bio"),
    user = document.querySelector("#user"),
    ph = document.querySelector(".ph-anchor");

  // author's name
  let author = user.dataset.author;

  // reference to author's document
  let docRef = db.collection("authors").doc(author);

  docRef.onSnapshot(function (doc) {
    if (doc.exists) {
      editedBio.innerHTML = doc.data().biography;
      tw.setAttribute("href", `https://twitter.com/${doc.data().twitter}`);
      fb.setAttribute("href", `https://facebook.com/${doc.data().facebook}`);
      ins.setAttribute("href", `https://instagram.com/${doc.data().instagram}`);
      ph.setAttribute("href", `tel:${doc.data().phone}`);
    }
  });
});
