// Copyright (c) 2015 Daniel Kronovet
// kronovet@gmail.com

// https://developer.chrome.com/extensions/webRequest
// https://developer.chrome.com/extensions/xhr
// https://developer.chrome.com/extensions/tabs

// Show page action icon in omnibar.
function showPageAction(tabId, changeInfo, tab) {
    chrome.pageAction.show(tabId);
};
// Call the above function when the url of a tab changes.
chrome.tabs.onUpdated.addListener(showPageAction);


function sendArc(details) {
  // Get requested page url
  var next_url = details.url;

  // Get current page url
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    var current_url = tabs[0].url;

    arcData = JSON.stringify({current: current_url, next: next_url})
    alert(arcData)

    // Send to server
    // var client = new XMLHttpRequest();
    // client.open("POST", "https://www.mywiki.space/arc");
    // client.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    // client.send(arcData);
  });
};

var filter = {
  urls: ["https://*.wikipedia.org/wiki/*"]
};

var opt_extraInfoSpec = [];

chrome.webRequest.onSendHeaders.addListener(
  sendArc, filter, opt_extraInfoSpec);