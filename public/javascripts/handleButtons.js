const sign_up = document.querySelector(".sign-up-button");
const background = document.querySelector(".form-background");
const login = document.querySelector(".log-in-button");
const membership = document.querySelector(".membership");
const delete_message = document.querySelector(".delete-message");

const login_form = document.querySelector(".login-form");
const sign_up_form = document.querySelector(".sign-up-form");
const sign_up_background = document.querySelector(".form-background");
const login_background = document.querySelector(".login-background");
const membership_form = document.querySelector(".membership-form");
const delete_form = document.querySelector(".delete-message-form");
const error_form = document.querySelector(".error-form")

const add_message = document.querySelector(".add-message-button");
const add_message_form = document.querySelector(".add-message-form");
const message_form = document.querySelector(".add-message_form");
const cancel = document.querySelector(".cancel");
const error_background = document.querySelector(".error-background") ;
if (error_form){
  error_background.addEventListener("click", () => 
    {error_background.classList.remove("blur");
    error_form.classList.remove("fade-in");
    error_form.classList.add("fade-out");
    error_background.classList.add("actual-fade-out");
    setTimeout(() => {
      error_form.classList.remove("fade-out");
      error_background.classList.remove("actual-fade-out")
      }, 500);
  }
  )
}
if(membership)
{
  membership.addEventListener("click", () => {
  membership_form.classList.add("fade-in");
  sign_up_background.classList.add("blur");
})
  background.addEventListener("click", () => {
    sign_up_background.classList.remove("blur");
    membership_form.classList.remove("fade-in");

    membership_form.classList.add("fade-out");
    sign_up_background.classList.add("actual-fade-out")
    setTimeout(() => {
    membership_form.classList.remove("fade-out");
    sign_up_background.classList.remove("actual-fade-out")
    }, 500);
  })
}
if(add_message){
  add_message.addEventListener("click", () => {
    add_message_form.classList.add("hide");
    add_message.classList.add("hide");
    add_message_form.classList.remove("hide");

  })
  cancel.addEventListener("click", () => {
    add_message_form.classList.remove("hide");
    add_message.classList.remove("hide");
    add_message_form.classList.add("hide");
  })

    delete_message.addEventListener("click", () => {
      delete_form.classList.add("fade-in")
      sign_up_background.classList.add("blur");
    })


  background.addEventListener("click", () => {
    sign_up_background.classList.remove("blur");
    delete_form.classList.remove("fade-in");

    delete_form.classList.add("fade-out");
    sign_up_background.classList.add("actual-fade-out")
    setTimeout(() => {
    delete_form.classList.remove("fade-out");
    sign_up_background.classList.remove("actual-fade-out")
    }, 500);
  })
}
if(login)
{login.addEventListener("click", () => {
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
  });}