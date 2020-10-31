// get document title
const commentForm = document.getElementById("commentForm");
const replyForm = document.querySelector("#replyForm");
const postedComments = document.querySelector("#posted-comments");
const noComment = document.querySelector(".no-comment");

const title = document.title;
let titleId = title.substring(0, 80);

// Get a reference to the database service
const ref = firebase.database().ref(`Comments/${titleId}`);

// Listen for comment submission
commentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  event.stopImmediatePropagation;
  event.stopPropagation();

  //Get input values
  let name = commentForm.name.value,
    number = commentForm.phone.value,
    dialCode = iti.getSelectedCountryData().dialCode,
    pad = number.startsWith("0") ? number.replace("0", "") : number,
    phone = dialCode + pad,
    message = commentForm.message.value;

  // reply

  // data structure
  let data = { name: name, phone: phone, message: message };

  let newRef = ref.push();

  //Set author data into firestore db
  newRef.set(data).then(function () {
    // show alert
    document.querySelector(".comment-alert").style.display = "block";

    // hide alert after five seconds
    setTimeout(function () {
      document.querySelector(".comment-alert").style.display = "none";
    }, 3000);

    commentForm.reset();
  });
});

//create element and render comments
function renderComment(doc, comments) {
  let li = document.createElement("li"),
    div = document.createElement("div"),
    span = document.createElement("span"),
    para = document.createElement("p"),
    button = document.createElement("button"),
    aLink = document.createElement("a");

  div.setAttribute("data-id", doc);
  button.setAttribute("class", "read-replies");
  aLink.setAttribute("class", "reply-link");
  aLink.setAttribute("href", "#replyForm");

  span.textContent = `from ${comments[doc].name}`;
  para.textContent = comments[doc].message;
  button.textContent = "read replies";
  aLink.textContent = "reply";

  div.appendChild(button);
  div.appendChild(aLink);

  li.appendChild(span);
  li.appendChild(para);
  li.appendChild(div);

  postedComments.appendChild(li);
}

let parentId = document.querySelector(".parentId");

// fetch comments when the page loads
window.addEventListener("DOMContentLoaded", function (event) {
  event.preventDefault();
  event.stopImmediatePropagation();
  event.stopPropagation();

  var commentClosed = document.querySelector(".comments-closed");

  ref.on("value", function (snapshot) {
    if (snapshot.exists()) {
      noComment.style.display = "none";

      let comments = snapshot.val();
      let keys = Object.keys(comments);

      //loop though the comment objects
      keys.forEach(function (key) {
        renderComment(key, comments);

        // Toggles comment form and reply form
        let replyLinks = document.querySelectorAll(".reply-link");
        replyLinks.forEach(function (replyLink) {
          replyLink.addEventListener("click", function (event) {
            event.stopPropagation();

            replyForm.style.display = "block";
            commentForm.style.display = "none";

            let id = replyLink.parentElement.getAttribute("data-id");
            parentId.dataset.docId = id;

            let input = document.querySelector("#rePhone"),
              errorMsg = document.querySelector(".reError-msg"),
              validMsg = document.querySelector(".reValid-msg");

            let errorMap = [
              "Invalid",
              "Invalid code",
              "Too short",
              "Too long",
              "Invalid",
            ];

            var iti = window.intlTelInput(input, {
              autoPlaceholder: "aggressive",
              initialCountry: "",
              preferredCountries: ["gh", "ng"],
              utilsScript: "/scripts/utils.js",
              hiddenInput: "full",
              autoHideDialCode: false,
            });

            let reset = function () {
              input.classList.remove("error");
              errorMsg.innerHTML = "";
              errorMsg.classList.add("hide-notice");
              validMsg.classList.add("hide-notice");
            };

            // on blur: validate
            input.addEventListener("blur", function () {
              reset();
              if (input.value.trim()) {
                if (iti.isValidNumber()) {
                  validMsg.classList.remove("hide-notice");
                } else {
                  input.classList.add("error");
                  var errorCode = iti.getValidationError();
                  errorMsg.innerHTML = errorMap[errorCode];
                  errorMsg.classList.remove("hide-notice");
                }
              }
            });

            // on keyup / change flag: reset
            input.addEventListener("change", reset);
            input.addEventListener("keyup", reset);
          });
        });

        // Displays current replies
        let readReplies = document.querySelectorAll(".read-replies");
        readReplies.forEach(function (readReply) {
          readReply.addEventListener("click", function (event) {
            event.stopPropagation();
            event.preventDefault();
            event.stopImmediatePropagation();

            let parentToken = readReply.parentElement.getAttribute("data-id");

            let replyRef = firebase
              .database()
              .ref(`Comments/${titleId}/${parentToken}/replies`);

            console.log("Parent Token:", parentToken);

            replyRef.on("value", function (snapshot) {
              if (snapshot.exists()) {
                let replies = snapshot.val();
                var keys = Object.keys(replies);

                //loop though the comment objects
                keys.forEach(function (key) {
                  renderReply(key, replies, readReply);
                });
              }
            });
          });

          let parentTokenId = readReply.parentElement.getAttribute("data-id");

          let reRef = firebase
            .database()
            .ref(`Comments/${titleId}/${parentTokenId}/replies`);

          reRef.on("value", function (snapshot) {
            if (snapshot.exists()) {
              let reps = snapshot.val();
              let reKeys = Object.keys(reps);

              let reSibling = readReply.nextElementSibling;
              if (reKeys.length === 5) {
                reSibling.style.display = "none";
              } else {
                reSibling.style.display = "block";
              }
            }
            if (!snapshot.exists()) {
              readReply.style.display = "none";
            } else {
              readReply.style.display = "block";
            }
          });
        });
      });

      if (keys.length == 10) {
        commentClosed.style.display = "block";
        commentForm.style.display = "none";
      } else {
        commentClosed.style.display = "none";
        commentForm.style.display = "block";
      }
    }
  });
});

replyForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let replyName = replyForm.reName.value,
    number = replyForm.rePhone.value,
    dialCode = iti.getSelectedCountryData().dialCode,
    pad = number.startsWith("0") ? number.replace("0", "") : number,
    replyPhone = dialCode + pad,
    replyMessage = replyForm.reMessage.value;

  let replies = { name: replyName, phone: replyPhone, message: replyMessage };

  let parentKey = parentId.dataset.docId;
  console.log("Parent Key", parentKey);

  let newPostKey = firebase.database().ref().child("Comments").push().key;
  let updates = {};
  updates[`/Comments/${titleId}/${parentKey}/replies/${newPostKey}`] = replies;

  let newRef = firebase.database().ref();

  newRef.update(updates).then(function () {
    document.querySelector(".reply-alert").style.display = "block";

    // hide alert and toggle forms after some seconds
    setTimeout(function () {
      commentForm.style.display = "block";
      replyForm.style.display = "none";

      replyForm.reset();
      document.querySelector(".comment-alert").style.display = "none";
    }, 3000);
  });
});

//create element and render replies
function renderReply(doc, replies, tokenEl) {
  let li = document.createElement("li"),
    span = document.createElement("span"),
    ul = document.createElement("ul"),
    para = document.createElement("p");

  span.textContent = `from ${replies[doc].name}`;
  para.textContent = replies[doc].message;

  li.appendChild(span);
  li.appendChild(para);

  ul.setAttribute("class", "recent-replies");

  ul.appendChild(li);

  let parentDiv = tokenEl.parentElement.parentElement;

  li.setAttribute("class", "recent-replies");
  parentDiv.appendChild(ul);
}
