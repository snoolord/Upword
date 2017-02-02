import { getWord, getFieldsAndAddEventListeners } from './listener';
console.log("JavaScript successfully injected");

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    getFieldsAndAddEventListeners('div[contenteditable="true"]');
    getFieldsAndAddEventListeners('input');
    getFieldsAndAddEventListeners('textarea');
    // ...
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  attributes: true
  //...
});

(() => {
    const anchor = document.createElement('div');
    anchor.id = 'upword-anchor';
    document.body.insertBefore(anchor, document.body.childNodes[0]);
    document.body.addEventListener('mouseup', getWord);

})();
