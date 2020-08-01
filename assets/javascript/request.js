// Send request without JWT.
async function sendWithoutToken (url){
    const response = await fetch(url);
    const content = await response.json();
    return content;
}


// Send async request with nested body.
async function sendRequestAsync(url, body) {
    const authModel = JSON.parse(localStorage.getItem("accessToken"));
    const jwt = authModel.JwtToken;

    const response = await fetch(url, {
        method: 'POST',
        withCredentials: true,
        headers: {
        'Authorization': `Bearer ${jwt}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}


// Generalized method for all GET authorized requests. Refresh request included.
async function sendRequestAsyncWithRefresh(method, url) {
    const tokens = JSON.parse(localStorage.getItem("accessToken"));
    let token = tokens.JwtToken;

    const response = await fetch(url, {
        method: method,
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
            'Accept': 'application/json',
    }
    });
    if (response.ok) {
        return response.json();
    }
    if (response.status === 401) {   
        const tokens = JSON.parse(localStorage.getItem("accessToken"));
        let refreshToken = tokens.RefreshToken;

        const refreshResponse = await fetch("https://localhost:5001/api/account/refresh", {
            method: 'POST',
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${refreshToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(refreshToken)
        });

        const tokenData = await refreshResponse.json();
        localStorage.setItem("accessToken", JSON.stringify(tokenData));
    }
    // const error = await response.json();
    // const someError = new Error("Some error..");
    // someError.data = error;
}





export {
    sendRequestAsync,
    sendWithoutToken,
    sendRequestAsyncWithRefresh
}