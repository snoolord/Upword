import createDropdownTabsAndInfo from './dropdown-tabs'

const createDropdown = function (wordInfo, selectionCoordinates) {
    let upwordDropdown = document.createElement('div')
    console.log(wordInfo)
    console.log(selectionCoordinates)
    console.log(this)
    upwordDropdown.setAttribute('class', 'upword-dropdown')
    // if (selectionCoordinates.bottom) {
    upwordDropdown.style.top = window.pageYOffset + selectionCoordinates.bottom + 'px'
    // } else {
        // upwordDropdown.style.top = window.pageYOffset + selectionCoordinates.top + "px";
    // }
    upwordDropdown.style.left = selectionCoordinates.left + 'px'
    // upwordDropdown.style.height = 100 + "px";
    // upwordDropdown.style.width = 100 + "px";

    createDropdownTabsAndInfo(upwordDropdown, wordInfo)
    return upwordDropdown
}

export default createDropdown
