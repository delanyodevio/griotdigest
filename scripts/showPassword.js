function showPassword() {
  var x = document.querySelector(".showPass");
  var y = document.querySelector(".show-password");

  if (x.type === "password") {
    x.type = "text";
    y.innerHTML = "Hide Password";
    y.style.backgroundColor = "var(--turkey)";
    y.style.color = "#fff";
  } else {
    x.type = "password";
    y.innerHTML = "Show Password";
    y.style.backgroundColor = "var(--accent)";
    y.style.color = "#000";
  }
}
