import * as request from "./request.js";

let rememberCard;
const REMEMBER_CARD_URL = "https://localhost:5001/api/content";

const synonymButtons = document.querySelectorAll(".synonym__button");
const backToSynonymsBtn = document.querySelector(".back-to-synonyms-btn");
const rememberMeBtn = document.querySelector(".remember-context-btn");

// Insert the synonyms to the grid section and listen for click events to create info card.
async function createCard() {
    synonymButtons.forEach(button => button.addEventListener("click", async function(event) {

        const ContextURL = API_URL.getDatamuseUrl(button.textContent);
        const responseContext = await request.sendRequestAsyncWithRefresh("GET", ContextURL);
        const definitions = responseContext[0].Defs;

        let fixedDefinitions;
        if(definitions[0].indexOf("n") === 0) {
            fixedDefinitions =  definitions.map(str => str.slice(1));
        }
        else {
            fixedDefinitions =  definitions.map(str => str.slice(3));
        }
    
        document.querySelector(".wrap__context").classList.remove("wrap__context-flex");
        document.querySelector(".wrap__context").classList.add("display-none");
    
        document.querySelector(".wrap__card").classList.add("display-flex");

        document.querySelector(".card__word").textContent = button.textContent;
        document.querySelector(".card__description").textContent = fixedDefinitions;

        const authModel = JSON.parse(localStorage.getItem("accessToken"));
        const userId = authModel.Id;

        rememberCard = {
            word: button.textContent,
            definition: fixedDefinitions,
            ApplicationUserId: userId
        }
    }));
}


backToSynonymsBtn.addEventListener("click", function(event) {

    document.querySelector(".wrap__card").classList.remove("display-flex");
    document.querySelector(".wrap__context").classList.add("wrap__context-flex");
});

rememberMeBtn.addEventListener("click", fetchRequest);

async function fetchRequest() {
    const result = await request.sendRequestAsync(REMEMBER_CARD_URL, rememberCard);
}


export {
    createCard
}
