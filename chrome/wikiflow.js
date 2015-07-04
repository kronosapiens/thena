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


function sendEdge(details) {
  // Get current page url
  var current_url = chrome.tabs.getCurrent(function(tab) {
    return tab.url;
  });

  // Get requested page url
  var next_url = details.url;

  // Send to server
  edgeData = JSON.stringify({current: current_url, next: next_url})

  // var client = new XMLHttpRequest();
  // client.open("POST", "https://www.mywiki.space/edge");
  // client.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  // client.send(edgeData);
  alert(edgeData)
};

var filter = {
  urls: ["*://*.wikipedia.org/wiki/*"]
};

var opt_extraInfoSpec = [];

chrome.webRequest.onSendHeaders.addListener(
  sendEdge, filter, opt_extraInfoSpec);


// // When the extension is installed or upgraded ...
// chrome.runtime.onInstalled.addListener(function() {
//   // Replace all rules ...
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     // With a new rule ...
//     chrome.declarativeContent.onPageChanged.addRules([
//       {
//         // That fires when a page's URL contains a 'g' ...
//         conditions: [
//           new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: { urlContains: 'g' },
//           })
//         ],
//         // And shows the extension's page action.
//         actions: [ new chrome.declarativeContent.ShowPageAction() ]
//       }
//     ]);
//   });
// });