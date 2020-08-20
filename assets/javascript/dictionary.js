import * as request from "./request.js";

const vocabularyPannel = document.querySelector(".vocabulary");
const dictionaryButton = document.querySelector(".dictionary-button");

// Load and display own dictionary.
async function getRememberedCards() {
        const authModel = JSON.parse(localStorage.getItem("accessToken"));
        const userId = authModel.Id;
    
        const data = await request.sendRequestAsyncWithRefresh("GET", `https://localhost:5001/api/card/vocabulary?userId=${userId}`);
        
        data.forEach(element => {
            const rememberedWordElement = document.createElement("div");
            rememberedWordElement.classList.add("word__section");
            
            rememberedWordElement.innerHTML =
            `<div class="translation">
                <div class="main__word-info">
                    <p>${element.Word}</p>
                    <i class="fas fa-angle-down"></i>
                </div>
                <div class="word__definition display-none">${element.Definition}</div>
            </div>
            <button class="trash-button" data-id="${element.Id}">
                <i class="fas fa-trash"></i>
            </button>`;

            vocabularyPannel.appendChild(rememberedWordElement);
        });

        document.querySelector(".vocabulary").classList.remove("display-none");
        document.querySelector(".dictionary-logo").classList.remove("display-none");
        document.querySelector(".app-logo").classList.add("display-none");

        document.querySelector(".main__content").classList.remove("display-flex");
        document.querySelector(".main__content").classList.add("display-none");

        document.querySelector(".upside__part").classList.remove("display-flex");
        document.querySelector(".upside__part").classList.add("display-none");  
        
        wordSectionEvents();
}

// Add extend definition and delete word events.
function wordSectionEvents() {
    const definitionExtension = document.querySelectorAll(".translation");
    const deleteButton = document.querySelectorAll(".trash-button");

    //Extend definition part event listener.
    definitionExtension.forEach(element => {
        element.addEventListener("click", function (event) {
            const wordDefinition = element.children[1];
    
            if(wordDefinition.className === "word__definition display-none") {
                wordDefinition.classList.remove("display-none");
            }
            else {
                wordDefinition.classList.add("display-none");
            }
        });
    });

    //Delete word section from dictionary event listener.
    deleteButton.forEach(element => {
        element.addEventListener("click", function (event) {
            request.sendRequestAsyncWithRefresh("DELETE", `https://localhost:5001/api/card/${this.dataset.id}`);
            element.parentElement.remove();
        });
    });
}

dictionaryButton.addEventListener("click", getRememberedCards);

