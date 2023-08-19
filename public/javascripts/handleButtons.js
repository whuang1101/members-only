const sign_up = document.querySelector(".sign-up-button");
const background = document.querySelector(".form-background");
const login = document.querySelector(".log-in-button");
console.log("yes");

const login_form = document.querySelector(".login-form");
const sign_up_form = document.querySelector(".sign-up-form");
const sign_up_background = document.querySelector(".form-background");
const login_background = document.querySelector(".login-background");

login.addEventListener("click", () => {
  login_background.classList.add("blur");
  login_form.classList.add("fade-in");
});

sign_up.addEventListener("click", () => {
  sign_up_background.classList.add("blur");
  sign_up_form.classList.add("fade-in");

});
login_background.addEventListener ("click", () => {
  console.log("Button clicked");
  login_background.classList.remove("blur");
  login_form.classList.remove("fade-in");

  login_form.classList.add("fade-out");
  login_background.classList.add("actual-fade-out")
  setTimeout(() => {
  login_form.classList.remove("fade-out");
  login_background.classList.remove("actual-fade-out")
  }, 500);
})
background.addEventListener("click", () => {
    console.log("Button clicked");
    sign_up_background.classList.remove("blur");
    sign_up_form.classList.remove("fade-in");

    sign_up_form.classList.add("fade-out");
    sign_up_background.classList.add("actual-fade-out")
    setTimeout(() => {
    sign_up_form.classList.remove("fade-out");
    sign_up_background.classList.remove("actual-fade-out")
    }, 500);
  });