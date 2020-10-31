const signupForm = document.getElementById("signup");
const loginForm = document.getElementById("login");
const loading = document.getElementById("loading");

const lStorage = window.localStorage;

// listen for auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
  } else {
  }
});

//Handle signup form
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm.email.value,
    password = signupForm.password.value,
    username = makeSafeText(signupForm.username.value),
    fullname = makeSafeText(signupForm.fullname.value),
    country = makeSafeText(signupForm.country.value);

  lStorage.setItem("email", `${email}`);
  lStorage.setItem("password", `${password}`);
  lStorage.setItem("username", `${username}`);

  loading.innerHTML = "loading...";

  // sign up the user & add firestore data
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      const saveUserData = firebase.functions().httpsCallable("saveUserData");
      const postData = {
        name: fullname,
        username: username,
        country: country,
      };

      saveUserData(postData);

      var newUser = firebase.auth().currentUser;
      newUser.sendEmailVerification();

      signupForm.reset();

      // routes to success page
      window.location.assign("/success.html");
    })
    .catch((error) => {
      showNotification(error.message);
      loading.innerHTML = "Sign Up";
    });
});

//Handle login form
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;
  const localUsername = lStorage.getItem("username");

  loading.innerHTML = "loading...";

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      loginForm.reset();
      // routes to user dashboard
      window.location.assign(`/dashboard/${localUsername}.html`);
    })
    .catch((error) => {
      showNotification(error.message);
      loading.innerHTML = "Sign Up";
    });
});

// Safe text
function makeSafeText(str) {
  const safeText = String(str).replace(/[()$~%.'":*?<>{}]/g, "");
  return safeText;
}

// safe url for slug
function makeSafeUrl(str) {
  const safeUrl = String(str).replace(/[&,+()$~%.'":*?<>{}@#_ ]/g, "-");
  return safeUrl;
}

// notification
const notification = document.querySelector(".notification");

const showNotification = (message) => {
  notification.textContent = message;
  notification.classList.add("show-notice");

  setTimeout(() => {
    notification.classList.remove("show-notice");
    notification.textContent = "";
  }, 8000);
};
