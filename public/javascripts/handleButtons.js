const sign_up = document.querySelector(".sign-up-button");
const background = document.querySelector(".form-background");
console.log("yes");

const sign_up_form = document.querySelector(".sign-up-form");
const sign_up_background = document.querySelector(".form-background");
sign_up.addEventListener("click", () => {
  sign_up_background.classList.add("blur");
  sign_up_form.classList.add("fade-in");

});
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