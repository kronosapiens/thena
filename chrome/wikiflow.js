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

      arcData = JSON.stringify({tail: tail, head: head, email: email})

      // Send to server
      var client = new XMLHttpRequest();
      client.open("POST", "http://127.0.0.1:5000/arc");
      client.send(arcData);
    });
  });
};

var filter = {
  urls: ["https://*.wikipedia.org/wiki/*"]
};

var opt_extraInfoSpec = [];

chrome.webRequest.onSendHeaders.addListener(
  sendArc, filter, opt_extraInfoSpec);