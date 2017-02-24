import axios from 'axios'
import createDropdown from './dropdown/dropdown'
import { Selection } from './util'
import { positionDropdown } from './dropdown/dropdown-sizing'

let selectionFunctions = Selection()
let currField = {
    selection: null,
    field: null,
    savedSelection: null,
    setCurrField: function(field) {
        this.field = field
    },
    saveSelection: selectionFunctions.saveSelection,
    restoreSelection: selectionFunctions.restoreSelection
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
    if (this.field) {
        this.savedSelection = this.saveSelection(this.field)
    }
    this.selection = txt.toString().toLowerCase()
    console.log(this.selection)
    let validSelection = this.selection.trim().length > 0
    if (validSelection) {
        let selectionCoordinates = txt.getRangeAt(0).getBoundingClientRect()
        let url = 'https://upword-server.herokuapp.com/word/'
        const that = this
        axios.get(url + this.selection, {
            validateStatus: function (status) {
                return status >= 200 && status < 300
            }
        }).then(function (response) {
            let upwordAnchor = document.getElementById('upword-anchor')
            let upwordDropdown = createDropdown.call(that, response.data, selectionCoordinates)
            upwordAnchor.appendChild(upwordDropdown)
            positionDropdown(upwordDropdown, selectionCoordinates)
            console.log(upwordDropdown.offsetWidth, upwordDropdown.offsetHeight)

        }).catch(function () {
            axios.post(url, {
                word: that.selection
            }).then(function (response) {
                let upwordAnchor = document.getElementById('upword-anchor')
                let upwordDropdown = createDropdown.call(that, response.data, selectionCoordinates)
                upwordAnchor.appendChild(upwordDropdown)
                console.log(upwordDropdown.offsetWidth, upwordDropdown.offsetHeight)
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
