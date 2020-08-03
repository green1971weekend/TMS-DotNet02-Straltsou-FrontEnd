import * as request from "./request.js";
import * as search from "./autocomplete.js";
import * as picture from "./picture.js";
import * as card from "./card.js";
import * as dictionary from "./dictionary.js";

//https://api.datamuse.com/words?ml=ringing+in+the+ears - feature for search the similar words for input of few (ringing+in+the+ears)

const translate = document.querySelector(".translate");


// Refresh the page with updated info.
async function displayFullInfo() {   
    document.querySelector(".wrap__card").classList.remove("display-flex")
    document.querySelector(".wrap__card").classList.add("display-none")

    const responseTranslate = await searchForTranslate();
    translate.textContent = responseTranslate.Text;
    await searchForContext();

    document.querySelector(".wrap__context").classList.remove("display-none");
    document.querySelector(".wrap__context").classList.add("wrap__context-flex");

    document.querySelector(".introduction__context").style.display = "none";
    
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


function main() {
    if(!localStorage.getItem("accessToken")){
        location.replace("/index.html");
    }

    search.autocomplete();
    card.createCard();
}



document.addEventListener("DOMContentLoaded", main);

export {
    displayFullInfo
}