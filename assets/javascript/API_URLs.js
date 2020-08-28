const API_URL = {

    getYandexUrl(input) {
        return `https://learn-application.herokuapp.com/api/content/translate?input=${input}`;
    },
    
     getUnsplashUrl(input) {
        return `https://learn-application.herokuapp.com/api/content/picture?input=${input}`;
    },

    getDatamuseUrl(input) {
        return `https://learn-application.herokuapp.com/api/content/context?input=${input}`;
    },

    getRememberedCards() {
        return "https://learn-application.herokuapp.com/api/content/vocabulary";
    }
}
