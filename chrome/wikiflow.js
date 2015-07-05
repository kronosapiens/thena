// Copyright (c) 2015 Daniel Kronovet
// kronovet@gmail.com

// https://developer.chrome.com/extensions/webRequest
// https://developer.chrome.com/extensions/xhr
// https://developer.chrome.com/extensions/tabs

chrome.identity.getProfileUserInfo(function(userInfo) {
  alert(userInfo.email)
  alert(userInfo.id)
});

function getEmail() {
  chrome.identity.getAuthToken({interactive: true}, function(token) {
  // "https://www.googleapis.com/userinfo/email?alt=json" URL to get email address
  });
};

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

    arcData = JSON.stringify({tail: tail, head: head})

    // Send to server
    var client = new XMLHttpRequest();
    client.open("POST", "http://127.0.0.1:5000/arc");
    client.send(arcData);
  });
};

var filter = {
  urls: ["https://*.wikipedia.org/wiki/*"]
};

var opt_extraInfoSpec = [];

chrome.webRequest.onSendHeaders.addListener(
  sendArc, filter, opt_extraInfoSpec);