import * as request from "./request.js";

const GET_CARDS = "https://localhost:5001/api/content/vocabulary";
const vocabularyPannel = document.querySelector(".vocabulary");
const dictionaryButton = document.querySelector(".dictionary-button");
const definitionExtension = document.querySelectorAll(".translation");
const definition = document.querySelector(".word__definition");

async function sendRequestAsync(url) {
    const authModel = JSON.parse(localStorage.getItem("accessToken"));
    const jwt = authModel.JwtToken;

    const response = await fetch(url, {
        method: 'GET',
        withCredentials: true,
        headers: {
        'Authorization': `Bearer ${jwt}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        return response.json();
    }
}

async function getRememberedCards() {
        const authModel = JSON.parse(localStorage.getItem("accessToken"));
        const userId = authModel.Id;
    
        const data = await request.sendRequestAsyncWithRefresh("GET", `https://localhost:5001/api/content/vocabulary?userId=${userId}`);

        console.log(data);
        data.forEach(element => {
            const rememberedWordElement = document.createElement("div");
            rememberedWordElement.classList.add("word__section");
            
            rememberedWordElement.innerHTML =
                    `<div class="translation">${element.Word}</div>
                    <button class="trash-button">
                        <i class="fas fa-trash"></i>
                    </button>`;

            vocabularyPannel.appendChild(rememberedWordElement);
        });


        document.querySelector(".vocabulary").classList.remove("display-none");

        document.querySelector(".main__content").classList.remove("display-flex");
        document.querySelector(".main__content").classList.add("display-none");

        document.querySelector(".upside__part").classList.remove("display-flex");
        document.querySelector(".upside__part").classList.add("display-none");        
}

dictionaryButton.addEventListener("click", getRememberedCards);
definitionExtension.forEach(element => {
    element.addEventListener("click", function (event) {
        definition.classList.remove("display-none");
    });
});

export {
    getRememberedCards
}

