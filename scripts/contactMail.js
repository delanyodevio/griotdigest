const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let name = contactForm.fullname.value,
    email = contactForm.email.value,
    phone = contactForm.phone.value,
    sponsor = contactForm.sponsor.checked ? "True" : "False",
    suggestion = contactForm.suggestion.checked ? "True" : "False",
    opinion = contactForm.opinion.checked ? "True" : "False",
    legal = contactForm.legal.checked ? "True" : "False",
    bug = contactForm.bug.checked ? "True" : "False",
    message = contactForm.message.value,
    subject = escape("Say hello to Griot Studio\n"),
    body = escape(`
      Name:  ${name}.\n
      Email:  ${email}.\n 
      Phone:  ${phone}.\n\n
      Sponsor:  ${sponsor}.\n
      Link Suggestion:  ${suggestion}.\n
      Voicing Opinion:  ${opinion}.\n
      Copyright/Legal:  ${legal}.\n
      Bug Suggestion:  ${bug}.\n\n
      The Message: ${message}
      `);

  function sendMail() {
    let mail = `mailto:hello@griotstudio.com?subject=${subject}&body=${body}`;
    window.location.href = mail;
  }

  contactForm.action = `javascript:${sendMail()}`;
  contactForm.reset();
});
