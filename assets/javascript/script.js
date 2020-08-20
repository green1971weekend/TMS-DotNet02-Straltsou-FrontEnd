import * as request from "./request.js";
import * as search from "./autocomplete.js";
import * as picture from "./picture.js";
import * as card from "./card.js";
import * as dictionary from "./dictionary.js";

const translate = document.querySelector(".translate");
const homeButton = document.querySelector(".home");
const logoutButton = document.querySelector(".logout");


// Refresh the page with updated info.
async function displayFullInfo() {   
    document.querySelector(".wrap__card").classList.remove("display-flex")
    document.querySelector(".wrap__card").classList.add("display-none")

    const responseTranslate = await searchForTranslate();
    translate.textContent = responseTranslate.Outputs[0].Output;
    await searchForContext();

    document.querySelector(".wrap__context").classList.remove("display-none");
    
    picture.displayFilteredResult();
}

// Get JSON result of translate.
async function searchForTranslate() {
    const translateURL = API_URL.getYandexUrl(search.value);
    const responseTranslate = await request.sendRequestAsyncWithRefresh("GET", translateURL);

    return responseTranslate;
}

// Get JSON result of context.
async function searchForContext() {
    const ContextURL = API_URL.getDatamuseUrl(search.value);
    const responseContext = await request.sendRequestAsyncWithRefresh("GET", ContextURL);
    
    let i = 0;
    document.querySelectorAll(".synonym__button").forEach(s => s.textContent = responseContext[i++].Word);

    return responseContext;
}

// Main function for transfer functionality from modules.
function main() {
    if(!localStorage.getItem("accessToken")){
        location.replace("/index.html");
    }

    search.autocomplete();
    card.createCard();
}

homeButton.addEventListener("click", event => {
    location.replace("/app.html")
});

logoutButton.addEventListener("click", event => {
    location.replace("/index.html");
});



document.addEventListener("DOMContentLoaded", main);

export {
    displayFullInfo
}