import createDropdownTabsAndInfo from './dropdown-tabs'

const createDropdown = (wordInfo, selectionCoordinates) => {
    console.log(wordInfo)
    let upwordDropdown = document.createElement('div')

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
