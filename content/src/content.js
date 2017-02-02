import { getWord } from './listener';

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    let contentEditableDivs = document.querySelectorAll('div[contenteditable="true"]');
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
    console.log("hello");
    const anchor = document.createElement('div');
    anchor.id = 'upword-anchor';
    document.body.insertBefore(anchor, document.body.childNodes[0]);
    document.body.addEventListener('mouseup', getWord);

})();
