window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
    t._e.push(f);
};

    return t;
}(document, "script", "twitter-wjs"));


FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
        var accessToken = response.authResponse.accessToken;
    }
} );

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);

    if (response.status === 'connected') {
        testAPI();
    } else {       
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    }
}


function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '{111187574949444}',
        cookie     : true,                           
        xfbml      : true,  
        version    : '{v14.0}' 
    });
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

};

function testAPI() {
    console.log(' Welcome! .... ');
    FB.api('/me','GET', {"fields":"id,name,email"},function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'logging in, ' + response.name + '!';
    });
}
