//Generalized function for getting json object.
async function send (url){
    const response = await fetch(url);
    const content = await response.json();
    return content;
}


export {
    send
}