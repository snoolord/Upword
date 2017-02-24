import axios from 'axios'
import createDropdown from './dropdown/dropdown'


let currField = {
    field: null,
    setCurrField: function(field) {
        this.field = field
    }
}

chrome.extension.onMessage.addListener(function (message, sender, callback) {
    if (message.functiontoInvoke == "getWord") {
        getWord();
    }
})


export const getWord = function () {
    let txt = window.getSelection() ||
              document.getSelection() ||
              document.selection.createRange()
    // if (txt.baseNode.parentNode !== this.field ) {
    //     console.log('hi')
    // }
    let selection = txt.toString().toLowerCase()
    let validSelection = selection.trim().length > 0
    if (validSelection) {
        // this.selectedWord = selection
        // this.selectionStart = this.sel.anchorOffset
        // this.selectionEnd = this.sel.focusOffset
        let selectionCoordinates = txt.getRangeAt(0).getBoundingClientRect()
        let url = 'https://upword-server.herokuapp.com/word/'
        const that = this
        axios.get(url + selection, {
            validateStatus: function (status) {
                return status >= 200 && status < 300
            }
        }).then(function (response) {
            let upwordAnchor = document.getElementById('upword-anchor')
            let upwordDropdown = createDropdown.call(that, response.data, selectionCoordinates)
            upwordAnchor.appendChild(upwordDropdown)
        }).catch(function () {
            axios.post(url, {
                word: selection
            }).then(function (response) {
                let upwordAnchor = document.getElementById('upword-anchor')
                let upwordDropdown = createDropdown.call(that, response.data, selectionCoordinates)
                upwordAnchor.appendChild(upwordDropdown)
            })
        })
    }
}.bind(currField)




export const getFieldsAndAddEventListeners = (queryString) => {

    let fields = document.querySelectorAll(queryString)
    let event = 'select'
    if (queryString === 'div[contenteditable="true"]') {
        event = 'dblclick'
    }
    if (fields.length > 0) {
        fields.forEach( field => {
            field.addEventListener('focus', function () {
                currField.setCurrField(this)
            })
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
