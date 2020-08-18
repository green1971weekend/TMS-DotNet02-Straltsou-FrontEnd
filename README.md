# LearnApp [FrontEnd]
[![Netlify Status](https://api.netlify.com/api/v1/badges/7775b2a1-a1ad-4bc3-b857-e152af97faa6/deploy-status)](https://app.netlify.com/sites/learn-app/deploys)

Main idea of this application is to provide user interface for a back-end part of LearnApp which intended to support and provide for learner all necessarily knowledges of translate, definitions, pictures etc.

# Getting Started

For the correct start of application follow the instructions in application settings below.

# Application settings

In apiKeys section you need to write following functions and insert your own api tokens from Yandex translate and Unsplash.

```
const SecretUrl = {

    getYandexUrl(input) {
        return `https://translate.yandex.net/api/v1.5/tr.json/translate?key=[YourToken]&text=${input}&lang=en-ru`;
    },
    
     getUnsplashUrl(input) {
         return `https://api.unsplash.com/search/photos?client_id=[YourToken]&query=${input}`;
    }
}
```