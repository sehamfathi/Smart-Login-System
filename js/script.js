// select elments
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var inputPassword = document.getElementById("inputPassword");
var inputEmail = document.getElementById("inputEmail");
var emailTextError = document.getElementById("emailTextError");
var passTextError = document.getElementById("passTextError");
var isExist = document.getElementById("isExist");
var usernameTextError = document.getElementById("usernameTextError");
var user;
var users = [];

window.addEventListener("load", function () {
  if (localStorage.getItem("users") != null) {
    users = JSON.parse(localStorage.getItem("users"));
  } else {
    users = [];
  }
});

//function check to the  input email exist in localstroage.
const isEmailExist = function () {
  for (var i = 0; i < users.length; i++) {
    if (users[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
      return false;
    }
  }
};

//fucution to signup store the values in the localstrorage
function signUp() {
  user = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };
  console.log(users);
  if (
    validateEmail(signupEmail.value) &&
    validatePassword(signupPassword.value) &&
    validateUsername(signupName.value)
  ) {
    if (isEmailExist() != false) {
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      document.getElementById("exist").innerHTML =
        '<span class="text-success m-3">Success</span>';
    } else {
      document.getElementById("exist").innerHTML =
        '<span class="text-danger m-3">Email already exist </span>';
    }
  }
}

// store the user in localstroge
const setSession = function (userName) {
  console.log("hello tamrir al values");
  localStorage.setItem("sessionUserName", userName);
};

// check if user exist if email exist and password.
const isUserExist = function () {
  for (var i = 0; i < users.length; i++) {
    if (
      users[i].email.toLowerCase() == inputEmail.value.toLowerCase() &&
      users[i].password == inputPassword.value
    ) {
      setSession(users[i].name);
      return true;
    }
  }
};

// to direct the page to home page
function redirectToHomepage() {
  window.location.replace("/" + "home.html");
}
// sign in to home page after check the user exist or not
function SignIn() {
  if (
    validateEmail(inputEmail.value) &&
    validatePassword(inputPassword.value)
  ) {
    if (isUserExist()) {
      redirectToHomepage();
    } else {
      isExist.innerHTML = "user is not exist";
    }
  }
}

function logout() {
  localStorage.removeItem("sessionUserName");
}

// function validation() {
//   return true;
// }
function validateUsername() {
  var regex = /[a-z]{3,}/;
  if (regex.test(signupName.value)) {
    usernameTextError.innerHTML = "";
    return true;
  } else {
    usernameTextError.innerHTML = "please enter more than 2 char";
    return false;
  }
}

function validateEmail(email) {
  var regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  if (regex.test(email)) {
    emailTextError.innerHTML = "";

    return true;
  } else {
    emailTextError.innerHTML = "Please enter valid email";

    return false;
  }
}

function validatePassword(password) {
  var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  if (regex.test(password)) {
    passTextError.innerHTML = "";
    return true;
  } else {
    passTextError.innerHTML =
      "please enter pass word conats at least one captelletter and numbers and symbols";
    return false;
  }
}
