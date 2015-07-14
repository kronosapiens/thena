// Copyright (c) 2015 Daniel Kronovet
// kronovet@gmail.com

// https://developer.chrome.com/extensions/webRequest
// https://developer.chrome.com/extensions/xhr
// https://developer.chrome.com/extensions/tabs
// https://developer.chrome.com/extensions/identity


// Show page action icon in omnibar.
function showPageAction(tabId, changeInfo, tab) {
    chrome.pageAction.show(tabId);
};

// Call the above function when the url of a tab changes.
chrome.tabs.onUpdated.addListener(showPageAction);


// Authenticate User
function getAuth(callback, interactive) {
  interactive = interactive || false;
  chrome.identity.getAuthToken({interactive: interactive}, function(token) {
      auth_url = "https://www.googleapis.com/userinfo/email?alt=json&access_token="
      var xhr = new XMLHttpRequest();
      xhr.open("GET", auth_url + token);

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          var resp = JSON.parse(xhr.responseText);

          if ('data' in resp){
            var authData = {
              token: token,
              email: resp.data.email,
              isVerified: resp.data.isVerified
            };
            callback(authData);
          } else if ('error' in resp){
            // alert('auth failed');
          };

        };
      };

      xhr.send();
  });
};

// {
//  "error": {
//   "errors": [
//    {
//     "domain": "global",
//     "reason": "required",
//     "message": "Login Required",
//     "locationType": "header",
//     "location": "Authorization"
//    }
//   ],
//   "code": 401,
//   "message": "Login Required"
//  }
// }


// {"domain":"127.0.0.1",
// "hostOnly":true,"httpOnly":true,"name":"session",
// "path":"/",
// "secure":false,"session":true,"storeId":"0",
// "value":"eyJfZnJlc2giOnRydWUsIl9pZCI6eyIgYiI6IlpUWTRabVEyWm1OallXSmtNVGhoTURCbVpqTmlNek0xT0dZMk1UQTRNRGs9In0sInVzZXJfaWQiOiIxIn0.CIYLKA.IsKeNm6Q8PGzODC7uO-QwuYcpYc"}

function sendAuth(authData) {
    // Get cookie for site
    chrome.cookies.get({url: 'http://127.0.0.1:5000/', name: 'session'}, function(cookie){
      alert(JSON.stringify(cookie))
      // Send authentication to server
      var xhr2 = new XMLHttpRequest();
      xhr2.open("POST", "http://127.0.0.1:5000/login");
      xhr2.setRequestHeader('Cookie', 'session=' + cookie.value)
      xhr2.send(JSON.stringify(authData));
      alert(JSON.stringify(authData));
    });
};

function authFlow() {
  getAuth(sendAuth, true);
}

var loginFilter = {
  urls: ["https://*.wikipedia.org/wiki/Main_Page"]
};

chrome.webRequest.onBeforeSendHeaders.addListener(
  authFlow, loginFilter, ['blocking']);


// Save Arcs
function sendArc(details) {
  // Get requested page url
  var head_url = details.url;

  // Get current page url
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var tail_url = tabs[0].url;

    getAuth(function(authData) {
      var arcData = JSON.stringify({
        tail_url: tail_url,
        head_url: head_url,
        // email: authData.email,
        token: authData.token
      });

      // Send to server
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://127.0.0.1:5000/arc");
      xhr.send(arcData);
      alert(arcData);
    });
  });
};

var wikiFilter = {
  urls: ["https://*.wikipedia.org/wiki/*"] // Corresponds to head, not tail
};

chrome.webRequest.onSendHeaders.addListener(
  sendArc, wikiFilter, []);