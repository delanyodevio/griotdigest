const editBio = document.querySelector(".edit-bio"),
  cancelEdit = document.querySelector(".cancel-edit"),
  editedBio = document.querySelector(".edited-bio"),
  editActions = document.querySelector(".edit-actions"),
  user = document.querySelector("#user"),
  submitButton = document.querySelector(".submitButton"),
  editBioForm = document.querySelector("#bioForm");

// author's name
let author = user.dataset.author;

// Author form Submission
editBioForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Form Inputs value fields
  let facebook = editBioForm.facebook.value,
    biography = editBioForm.biography.value;

  let twit = editBioForm.twitter.value,
    twitter = twit.startsWith("@") ? twit.replace("@", "") : twit;

  let inst = editBioForm.instagram.value,
    instagram = inst.startsWith("@") ? inst.replace("@", "") : inst;

  let number = editBioForm.phone.value,
    dialCode = iti.getSelectedCountryData().dialCode,
    pad = number.startsWith("0") ? number.replace("0", "") : number,
    phone = dialCode + pad;

  // data structure
  let data = {
    facebook: facebook,
    twitter: twitter,
    instagram: instagram,
    phone: phone,
    biography: biography,
  };

  // reference to author's document
  let docRef = db.collection("authors").doc(author);

  //Set author data into firestore db
  docRef.set(data).then(function () {
    cancelEdit.style.opacity = 0;
    editBioForm.style.height = "0";
    editActions.style.height = "3.6rem";

    editBioForm.reset();
  });

  //update author data into firestore db
  docRef.update(data).then(function () {
    cancelEdit.style.opacity = 0;
    editBioForm.style.height = "0";
    editActions.style.height = "3.6rem";

    editBioForm.reset();
  });

  submitButton.innerHTML = "loading...";
});

// Display the bio form when click
editBio.addEventListener("click", function (e) {
  e.preventDefault();

  // Form Inputs value fields
  let facebook = editBioForm.facebook,
    twitter = editBioForm.twitter,
    instagram = editBioForm.instagram,
    phone = editBioForm.phone,
    biography = editBioForm.biography;

  // reference to author's document
  let docRef = db.collection("authors").doc(author);

  docRef.get().then(function (doc) {
    if (doc.exists) {
      facebook.value = doc.data().facebook;
      twitter.value = doc.data().twitter;
      instagram.value = doc.data().instagram;
      phone.value = doc.data().phone;
      biography.value = doc.data().biography;
    }
  });

  cancelEdit.style.opacity = 1;
  editBioForm.style.height = "100%";
  editActions.style.height = "100%";
});

// Cancel the form editing
cancelEdit.addEventListener("click", function (e) {
  e.preventDefault();

  editBioForm.style.height = "0";
  cancelEdit.style.opacity = 0;
  editActions.style.height = "3.6rem";

  editBioForm.reset();
});

// fetch user data when the page loads
window.addEventListener("DOMContentLoaded", function () {
  // Grab the social anchor tags
  let tw = document.querySelector(".tw-anchor"),
    fb = document.querySelector(".fb-anchor"),
    ins = document.querySelector(".ins-anchor"),
    ph = document.querySelector(".ph-anchor");

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
