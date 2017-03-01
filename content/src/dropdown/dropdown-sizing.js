export const positionDropdown = (dropdown, selectionCoordinates) => {
    console.log(selectionCoordinates)
    console.log(dropdown.offsetWidth, dropdown.offsetHeight)
    let height = window.innerHeight,
    width = window.innerWidth,
    halfwayHeight = height - 330,
    halfwayWidth = Math.floor(width/2)
    // console.log("X:",height, "Y:", width)
    // console.log("BreakHeight:", halfwayHeight, "BreakWidth", halfwayWidth)
    if (selectionCoordinates.bottom > halfwayHeight) {
        dropdown.style.top = selectionCoordinates.top + window.pageYOffset - dropdown.offsetHeight + 'px'
    } else {
        dropdown.style.top = window.pageYOffset + selectionCoordinates.bottom + 'px'
    }

    if (selectionCoordinates.left > halfwayWidth) {
        dropdown.style.left = selectionCoordinates.right - dropdown.offsetWidth + 'px'
    } else {
        dropdown.style.left = selectionCoordinates.left + 'px'
    }
    dropdown.style.width = dropdown.offsetWidth + "px"
}
