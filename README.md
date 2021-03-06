# LearnApp [FrontEnd]

[![Netlify Status](https://api.netlify.com/api/v1/badges/9c076e57-1577-4f34-b05e-1f97439b6f37/deploy-status)](https://app.netlify.com/sites/learn-app/deploys)

Main idea of this application is to provide user interface for a back-end part of LearnApp which intended to support and provide for learner all necessarily knowledges of translate, definitions, pictures etc.

Server part of this application you can find [here](https://github.com/teachmeskills-dotnet/TMS-DotNet02-Straltsou).

# Getting Started

Application is free-to-use. For start using this application you need to register by the [following link](https://learn-app.netlify.app).

# Deployment to Netlify
For the correct deployment on the [current resourse](https://www.netlify.com/) at first you must log in. After the successful login just drag and drop your front-end application folder to the spicified window.

```
Want to deploy a new site without connecting to Git?
Drag and drop your site folder here
```

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

# Author
[Maksim Straltsou](https://github.com/green1971weekend) - Software Developer

# License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/green1971weekend/TelegramBot/blob/master/LICENSE) file for details.
