import { mutationObserver } from './mutation-observer';

console.log("JavaScript successfully injected");

mutationObserver();

(() => {
    const anchor = document.createElement('div');
    anchor.id = 'upword-anchor';
    document.body.insertBefore(anchor, document.body.childNodes[0]);

})();
