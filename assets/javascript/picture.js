import * as search from "./autocomplete.js"
import * as request from "./request.js";

const slider = document.querySelector(".picture__slider");
const introductionInfo = document.querySelector(".picture__introduction");

const prevButton = document.querySelector("#prevBtn");
const nextButton = document.querySelector("#nextBtn");

let sliderImages;
let counter = 0;

// Get JSON result of pictures.
async function searchForPicture() {
    const PictureURL = API_URL.getUnsplashUrl(search.value);   
    const responsePicture = await request.sendRequestAsyncWithRefresh("GET", PictureURL);

    return responsePicture;
}

// Filter JSON result of pictures by the suitable size.
// Display filtered pictures and assign events for prev,next buttons.
async function displayFilteredResult() {
    slider.innerHTML = "";
    introductionInfo.innerHTML = "";

    const responsePicture = await searchForPicture();
    const filteredImage = responsePicture.Results.filter(img => img.height > 4500);
    let i = 0;
    filteredImage.forEach(img => { 
        const element = document.createElement("img");
        element.src = filteredImage[i++].urls.small;
        slider.appendChild(element);
    });

    sliderImages = document.querySelectorAll(".picture__slider img");
}


//Event for clicking the next picture button.
nextButton.addEventListener("click", function(){
    if(counter >= sliderImages.length - 1) {
        return;
    }
    slider.style.transition = "all 0.4s ease-in-out";
    counter++;
    slider.style.transform = "translateX(" + (-400 * counter) + "px";
});

//Event for clicking the previous picture button.
prevButton.addEventListener("click", function(){
    if(counter <= 0) {
        return;
    }
    slider.style.transition = "all 0.4s ease-in-out";
    counter--;
    slider.style.transform = "translateX(" + (-400 * counter) + "px";
});

// slider.addEventListener("transitionend", function(){
//     if(sliderImages[counter].id === "lastClone") {
//         slider.style.transition = "none";
//         counter = sliderImages.length - 2;
//         slider.style.transform = "translateX(" + (-size * counter) + "px";
//     }
//     if(sliderImages[counter].id === "firstClone") {
//         slider.style.transition = "none";
//         counter = sliderImages.length - counter;
//         slider.style.transform = "translateX(" + (-size * counter) + "px";
//     }
// });



export {
    displayFilteredResult
}
