const createDropdown = (wordInfo, selectionCoordinates) => {
    console.log(wordInfo);
    let upwordDropdown = document.createElement('div');

    upwordDropdown.setAttribute('class', 'upword-dropdown');
    upwordDropdown.style.top = selectionCoordinates.bottom + "px";
    upwordDropdown.style.left = selectionCoordinates.left + "px";
    upwordDropdown.style.width = 100 + "px";
    upwordDropdown.style.height = 100 + "px";

    return upwordDropdown;
}

export default createDropdown;
