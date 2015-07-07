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


function sendArc(details) {
  // Get requested page url
  var head = details.url;

  // Get current page url
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var tail = tabs[0].url;

    chrome.identity.getProfileUserInfo(function(userInfo) {
      var email = userInfo.email

      arcData = JSON.stringify({tail: tail, head: head, email: email});

      // Send to server
      var client = new XMLHttpRequest();
      client.open("POST", "http://127.0.0.1:5000/arc");
      client.send(arcData);
      alert(arcData);
    });
  });
};

var wikiFilter = {
  urls: ["https://*.wikipedia.org/wiki/*"] // Corresponds to head, not tail
};

chrome.webRequest.onSendHeaders.addListener(
  sendArc, wikiFilter, []);

function loginUser(details) {
  chrome.identity.getProfileUserInfo(function(userInfo) {
    var email = userInfo.email

    loginData = JSON.stringify({email: email});
    alert(loginData);

    // Send to server
    var client = new XMLHttpRequest();
    client.open("POST", "http://127.0.0.1:5000/login");
    client.send(loginData);
  });
};

var loginFilter = {
  urls: ["https://*.wikipedia.org/wiki/Main_Page"]
  // urls: ["<all_urls>"]
  // urls: ["http://127.0.0.1:5000/login"]
};

chrome.webRequest.onBeforeSendHeaders.addListener(
  loginUser, loginFilter, []);