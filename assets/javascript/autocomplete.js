import * as request from "./request.js";
import * as script from "./script.js";

const searchBox = document.querySelector(".search-box__input");
const optionPannel = document.querySelector(".options");
let searchValue = "";
let selectedOptionIndex = -1;

// Autocomplete function for search box.
function autocomplete() {
  searchBox.addEventListener("keyup", async function (event) {
    if (event.key === "ArrowDown") {
      resetSelectedClass();
      selectedOptionIndex =
        selectedOptionIndex < optionPannel.children.length - 1
          ? ++selectedOptionIndex
          : (selectedOptionIndex = optionPannel.children.length - 1);

      optionPannel.children[selectedOptionIndex].classList.add("option");
      searchBox.value = optionPannel.children[selectedOptionIndex].textContent;
      return;
    }
    if (event.key === "ArrowUp") {
      resetSelectedClass();
      selectedOptionIndex = selectedOptionIndex > 0 ? --selectedOptionIndex : 0;

      optionPannel.children[selectedOptionIndex].classList.add("option");
      searchBox.value = optionPannel.children[selectedOptionIndex].textContent;
      return;
    }
    if (event.key === "Enter") {
      optionPannel.innerHTML = "";
      searchValue = searchBox.value;
      script.displayFullInfo();
      return;
    }
    selectedOptionIndex = -1;

    const response = await request.sendWithoutToken(
      `https://api.datamuse.com/sug?s=${searchBox.value}`
    );
    optionPannel.innerHTML = "";
    response.forEach((element) => {
      const option = createOption(element.word);
      optionPannel.appendChild(option);
    });

    if (searchBox.value === "") {
      optionPannel.innerHTML = "";
    }
  });
}

// Create options for autocomplete, also fill the input by clicking mouse.
function createOption(word) {
  const option = document.createElement("div");
  option.textContent = word;

  option.addEventListener("click", function (event) {
    searchBox.value = this.textContent;
    optionPannel.innerHTML = "";

    searchValue = searchBox.value;
    script.displayFullInfo();
    return;
  });

  return option;
}

// Reset blue mark of selected option.
function resetSelectedClass() {
  for (let i = 0; i < optionPannel.children.length; i++) {
    optionPannel.children[i].classList.remove("option");
  }
}

export { autocomplete, searchValue as value };
