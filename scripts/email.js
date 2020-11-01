const emailForm = document.querySelector("#newsletter");

const PATH = window.location.pathname;

let message =
  "Thanks! Please check your email inbox for a confirmation message.";
const processForm = (form) => {
  const data = new FormData(form);
  data.append("form-name", "newsletter");

  fetch(`${PATH}`, {
    method: "POST",
    body: data,
  })
    .then(() => {
      form.innerHTML = `<div class="form-success emphasis">${message}</div>`;
    })
    .catch((error) => {
      form.innerHTML = `<div class="form-error emphasis">Error: ${error}</div>`;
    });
};

if (emailForm) {
  emailForm.addEventListener("submit", (e) => {
    e.preventDefault();

    processForm(emailForm);
  });
}
