// Copyright (c) 2015 Daniel Kronovet
// kronovet@gmail.com

// https://developer.chrome.com/extensions/webRequest
// https://developer.chrome.com/extensions/xhr
// https://developer.chrome.com/extensions/tabs
// https://developer.chrome.com/extensions/identity


// Show page action icon in omnibar.
function showPageAction(tabId, changeInfo, tab) {
    chrome.pageAction.show(tabId);
    // getAuth();
};
// Call the above function when the url of a tab changes.
chrome.tabs.onUpdated.addListener(showPageAction);

// Authenticate User
function getAuth() {
  chrome.identity.getAuthToken({interactive: true}, function(token) {
      email_url = "https://www.googleapis.com/userinfo/email?alt=json&access_token="

      var xhr = new XMLHttpRequest();
      xhr.open("GET", email_url + token);
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          var resp = JSON.parse(xhr.responseText);
          var authData = JSON.stringify({
            token: token,
            email: resp.data.email,
            isVerified: resp.data.isVerified
          })

          // Send authentication to server
          var xhr2 = new XMLHttpRequest();
          xhr2.open("POST", "http://127.0.0.1:5000/login");
          xhr2.send(authData);
          alert(authData)

        };
      };
      xhr.send();
  });
};

// Save Arcs
function sendArc(details) {
  // Get requested page url
  var head = details.url;

  // Get current page url
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var tail = tabs[0].url;

    // chrome.identity.getAuthToken(details, function(token) {
    //   var email = token
    chrome.identity.getProfileUserInfo(function(userInfo) {
      var email = userInfo.email

      var arcData = JSON.stringify({tail: tail, head: head, email: email});

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