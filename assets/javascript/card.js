import * as request from "./request.js";

const synonymButtons = document.querySelectorAll(".synonym__button");
const backToSynonymsBtn = document.querySelector(".back-to-synonyms-btn");
const rememberMeBtn = document.querySelector(".remember-context-btn");

// Insert the synonyms to the grid section and listen for click events to create info card.
function createCard() {
    synonymButtons.forEach(button => button.addEventListener("click", async function(event) {

        const ContextURL = `https://api.datamuse.com/words?ml=${button.textContent}&qe=ml&max=8&md=d`;
        const responseContext = await request.send(ContextURL);
        const definitions = responseContext[0].defs;

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

    }));
}


backToSynonymsBtn.addEventListener("click", function(event) {

    document.querySelector(".wrap__card").classList.remove("display-flex");
    document.querySelector(".wrap__context").classList.add("wrap__context-flex");
});



export {
    createCard
}
