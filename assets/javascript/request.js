//Generalized function for getting json object from API.
async function send (url){
    const response = await fetch(url);
    const content = await response.json();
    return content;
}


function sendXhrRequest(method, url, body = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = "json";
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(console.error(xhr.response));
            }
            else {
                resolve(console.log(xhr.response));
            }
        }
        xhr.onerror = () => console.error();
        xhr.send(JSON.stringify(body));
    }); 
}

export {
    send,
    sendXhrRequest
}