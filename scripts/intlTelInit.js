let input = document.querySelector("#phone"),
  errorMsg = document.querySelector(".error-msg"),
  validMsg = document.querySelector(".valid-msg");

let errorMap = ["Invalid", "Invalid code", "Too short", "Too long", "Invalid"];

var iti = window.intlTelInput(input, {
  autoPlaceholder: "polite",
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
