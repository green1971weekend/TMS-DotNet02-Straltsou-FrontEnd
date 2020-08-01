const LOGIN_URL = "https://localhost:5001/api/account";
const REGISTER_URL = "https://localhost:5001/api/account/register";


//Request function for registration of new user.
async function sendRegistrationRequestAsync (url, body){
    return await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}

//Registration new user function.
async function registerNewAccount() {
    const formData = {
        username: document.getElementById("registerEmailLogin").value,
        password: document.getElementById("registerPasswordLogin").value
    }

    const response = await sendRegistrationRequestAsync(REGISTER_URL, formData);

    if (response.ok === true) {
        getTokenAsync(LOGIN_URL, formData);
    }
}


// Sending request to the AccountController and getting the token.
async function getTokenAsync(url, formData) {

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });
    const data = await response.json();

    if (response.ok === true) {
        localStorage.setItem("accessToken", JSON.stringify(data));
        location.replace("/app.html");
     }
    else {
        console.log("Error: ", response.status, data.errorText);
    }
};


// Get JSON web token and login to account.
document.getElementById("submitLogin").addEventListener("click", e => {
    e.preventDefault();

    const formData = {
        username: document.getElementById("emailLogin").value,
        password: document.getElementById("passwordLogin").value
    }

    getTokenAsync(LOGIN_URL, formData);
});


// Register account.
document.getElementById("submitRegister").addEventListener("click", e => {
    e.preventDefault();
    registerNewAccount();
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


