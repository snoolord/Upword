import axios from 'axios'
import createDropdown from './dropdown/dropdown'

const getWord = function () {
    let txt = window.getSelection() ||
              document.getSelection() ||
              document.selection.createRange()
    let selection = txt.toString().toLowerCase()
    let validSelection = selection.trim().length > 0
    console.log(this)
    if (validSelection) {
        let selectionCoordinates = txt.getRangeAt(0).getBoundingClientRect()
        let url = `https://upword-server.herokuapp.com/word/${selection}`
        let that = this
        axios.get(url).then(function (response) {
            let upwordAnchor = document.getElementById('upword-anchor')
            let upwordDropdown = createDropdown.call(that, response.data, selectionCoordinates)
            console.log(upwordDropdown)
            upwordAnchor.appendChild(upwordDropdown)
        })
    }
}

export const getFieldsAndAddEventListeners = (queryString) => {
    function Field (field) {
        this.field = field
        this.getWord = getWord
    }
    let fields = document.querySelectorAll(queryString)
    let event = 'select'
    if (queryString === 'div[contenteditable="true"]') {
        event = 'dblclick'
    }
    if (fields.length > 0) {
        fields.forEach(field => {
        let fld = new Field(field)
            field.addEventListener(event, fld.getWord)
        })
    }
}

var getTextBoundingRect = function () {
    var sel = document.selection, range, rect
    var x = 0, y = 0
    if (sel) {
        if (sel.type != "Control") {
            range = sel.createRange()
            range.collapse(true)
            x = range.boundingLeft
            y = range.boundingTop
        }
    } else if (window.getSelection) {
        sel = window.getSelection()
        if (sel.rangeCount) {
            range = sel.getRangeAt(0).cloneRange()
            if (range.getClientRects) {
                range.collapse(true)
                if (range.getClientRects().length>0){
                    rect = range.getClientRects()[0]
                    x = rect.left
                    y = rect.top
                }
            }
            // Fall back to inserting a temporary element
            if (x == 0 && y == 0) {
                var span = document.createElement("span")
                if (span.getClientRects) {
                    // Ensure span has dimensions and position by
                    // adding a zero-width space character
                    span.appendChild( document.createTextNode("\u200b") )
                    range.insertNode(span)
                    rect = span.getClientRects()[0]
                    x = rect.left
                    y = rect.top
                    var spanParent = span.parentNode
                    spanParent.removeChild(span)

                    // Glue any broken text nodes back together
                    spanParent.normalize()
                }
            }
        }
    }
    console.log(x, y)
    return { left: x, top: y }
}
