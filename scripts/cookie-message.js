// capture the notice button
var cookieNotice = document.getElementById("cookie-notice"),
  cookieButton = document.getElementById("cookie-button"),
  cookieLink = document.getElementById("cookie-link");

// cookie expiry date
var expiresIn = 30;

var cookieName = "Africalifest cookie";
var cookieValue = "Africalifest cookie use";

// Remove cookie notification when clicked
cookieButton.addEventListener("click", function () {
  setCookie(cookieName, cookieValue, expiresIn);
  cookieNotice.style.display = "none";
});

cookieLink.addEventListener("click", function () {
  setCookie(cookieName, cookieValue, expiresIn);
});

// initialize cookie notice on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  checkCookie();
});

// Setting cookie
function setCookie(c_name, c_value, ex_days) {
  var d = new Date();
  d.setTime(d.getTime() + ex_days * 24 * 60 * 60 * 1000);

  var expires = "expires=" + d.toUTCString();

  document.cookie = c_name + "=" + c_value + ";" + expires + ";path=/";
}

// Test if cookie is there
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");

  for (var index = 0; index < ca.length; index++) {
    var c = ca[index];

    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// check if cookies are enabled
function checkCookie() {
  var visit = getCookie(cookieName);

  if (visit != "") {
    cookieNotice.style.display = "none";
  } else {
    cookieNotice.style.display = "block";
  }
}
