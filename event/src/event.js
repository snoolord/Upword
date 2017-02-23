import {getWord} from '../../content/src/listener';

var lookUpword = function() {
    console.log('looking upword')
    chrome.tabs.query({
       "active": true,
       "currentWindow": true
   }, function (tabs) {
       chrome.tabs.sendMessage(tabs[0].id, {
           "functiontoInvoke": "getWord"
       });
   });
}
chrome.contextMenus.create({'title': 'Look Upword', 'contexts': ['selection'], 'onclick': lookUpword})
