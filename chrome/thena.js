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
function getAuth() {
  chrome.identity.getAuthToken({interactive: true}, function(token) {
    alert(token)
  // "https://www.googleapis.com/userinfo/email?alt=json" URL to get email address
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