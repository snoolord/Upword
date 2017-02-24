import { getFieldsAndAddEventListeners } from './listener'
export const mutationObserver = () => {
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver

    var observer = new MutationObserver(function (mutations, obs) {
        // fired when a mutation occurs
        getFieldsAndAddEventListeners('div[contenteditable="true"]')
        getFieldsAndAddEventListeners('input')
        getFieldsAndAddEventListeners('textarea')
        // ...
    })
    // define what element should be observed by the observer
    // and what types of mutations trigger the callback
    observer.observe(document, {
        subtree: true,
        attributes: true
        //...
    })
}
