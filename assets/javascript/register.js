const LOGIN_URL = "https://localhost:5001/api/account";
const REGISTER_URL = "https://localhost:5001/api/account/register";

const loader = document.querySelector(".loader");

const form = document.getElementById("register");
const email = document.getElementById("registerEmailLogin");
const password = document.getElementById("registerPasswordLogin");
const passwordConfirmation = document.getElementById("registerPasswordConfirmation");

const loginForm = document.getElementById("login");
const emailLoginForm = document.getElementById("emailLogin");
const passwordLoginForm = document.getElementById("passwordLogin");

const registerSuccededMessage = document.querySelector(".register-successful-wrapper");

//Request function for registration of new user.
async function sendAuthenticationRequestAsync (url, body){
    loader.classList.toggle("hidden");

    const response = await fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    loader.classList.toggle("hidden");
    return response;
}

//Registration new user account by current values.
async function registerNewAccount() {

    const formData = {
        username: document.getElementById("registerEmailLogin").value,
        password: document.getElementById("registerPasswordLogin").value
    }

    const response = await sendAuthenticationRequestAsync(REGISTER_URL, formData);

    if (response.ok === true) {
        registerSuccededMessage.classList.remove("display-none");
        registerSuccededMessage.classList.add("display-flex");
    }
}


// Sending request to the AccountController and getting the token.
async function getTokenAsync(url, body) {
    
    const response = await sendAuthenticationRequestAsync(url, body);
    const data = await response.json();

    if (response.ok === true) {
        localStorage.setItem("accessToken", JSON.stringify(data));
        location.replace("/app.html");
     }
    else {
        console.log("Error: ", response.status, data.errorText);
    }
};


// Check all registration form inputs for valid data. Display correct or not entered data.
function checkRegistrationFormInputs() {
    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();
    let passwordConfirmationValue = passwordConfirmation.value.trim();

    if(emailValue === "") {
        setErrorFor(email, "Email cannot be blank");
    } else if(!isEmail(emailValue)) {
        setErrorFor(email, "Email is not valid");
    } else {
        setSuccessFor(email);
    }

    if(passwordValue === "") {
        setErrorFor(password, "Password cannot be blank");
    } else if(passwordValue.length < 8) {
        setErrorFor(password, "Password length must be minimum 8 symbols");
    }
    else {
        setSuccessFor(password);
    }

    if(passwordConfirmationValue === "") {
        setErrorFor(passwordConfirmation, "Confirmation field cannot be blank");
    } else if(passwordValue !== passwordConfirmationValue) {
        setErrorFor(passwordConfirmation, "Passwords does not match");
    } else {
        setSuccessFor(passwordConfirmation);
    }
}

// Display if the input field correct.
function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

// Display if the input field incorrect.
function setErrorFor(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";

    const small = formControl.querySelector("small");
    small.innerText = message;
}

// Check if the email field corresponds to regular expression below.
function isEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

// Returns true if the all form fields are correctly filled.
function validationFormCompleteCheck() {
    const formControls = document.querySelectorAll(".form-control");
    let checkFlag = true; 

    formControls.forEach(form => {
        if(form.className !== "form-control success") {
            checkFlag = false;
            return checkFlag;
        } 
    });

    return checkFlag;
}

// Get JSON web token and login to account.
document.getElementById("submitLogin").addEventListener("click", e => {
    e.preventDefault();

    const formData = {
        username: document.getElementById("emailLogin").value,
        password: document.getElementById("passwordLogin").value
    }

    if(formData.username && formData.password) {
        getTokenAsync(LOGIN_URL, formData); // Get new JWT and refresh token.
    }
});


// Register account by clicking register button.
document.getElementById("register").addEventListener("submit", e => {
    e.preventDefault();
    checkRegistrationFormInputs();

    const validationCheck = validationFormCompleteCheck();
    if(validationCheck) {
        registerNewAccount(); // Request for registration of new user.
    }
});


// Animation of login-register form 

// const login = document.querySelector(".toggle-login");
// const register = document.querySelector(".toggle-register");
// const btn = document.getElementById("btn");

// function register(){
//     login.style.left = "-400px";
//     register.style.left = "50px";
//     btn.style.left = "110px";
// }

// function login(){
//     login.style.left = "50px";
//     register.style.left = "450px";
//     btn.style.left = "0px";
// }

// register.addEventListener("click", function (e){
//     login.style.left = "-400px";
//     register.style.left = "50px";
//     btn.style.left = "110px";
// });

// login.addEventListener("click", function (e){
//     login.style.left = "50px";
//     register.style.left = "450px";
//     btn.style.left = "0px";
// });


