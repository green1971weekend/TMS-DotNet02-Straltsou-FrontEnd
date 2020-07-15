const API_URL = {

    getYandexUrl(input) {
        return `https://localhost:5001/api/content/translate?input=${input}`;
    },
    
     getUnsplashUrl(input) {
        return `https://localhost:5001/api/content/picture?input=${input}`;
    },

    getDatamuseUrl(input) {
        return `https://localhost:5001/api/content/context?input=${input}`;
    }
}
