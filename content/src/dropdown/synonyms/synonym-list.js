const createSynonymsList = (field, synonyms) => {
    let synonymsContainer = document.createElement('div')
    synonymsContainer.setAttribute('class', 'synonyms-container')
    for (let i = 0; i < synonyms.length; i++) {
        let synonym = document.createElement('div')
        synonym.setAttribute('class', 'synonym')
        synonym.innerHTML = synonyms[i]
        if (field.savedSelection) {
            synonym.addEventListener('click', function (e) {
                field.field.focus()
                field.restoreSelection(field.field, field.savedSelection)
                if (field.firstWord) {
                    document.execCommand('insertParagraph', false)
                }
                document.execCommand('insertText', false, synonyms[i])

                // document.execCommand('delete')
                document.getElementsByClassName('upword-dropdown')[0].remove()
            })

            synonym.addEventListener('mouseover', function () {
                field.field.focus()
                field.restoreSelection(field.field, field.savedSelection)
                let newSelection = {
                    start: field.savedSelection.start,
                    end: field.savedSelection.start + synonyms[i].length
                }
                field.savedSelection = newSelection
                // document.execCommand('delete')
                if (field.firstWord) {
                    document.execCommand('insertParagraph', false)
                }
                document.execCommand('insertText', false, synonyms[i])
            })

            synonym.addEventListener('mouseout', function () {
                field.field.focus()
                field.restoreSelection(field.field, field.savedSelection)
                let newSelection = {
                    start: field.savedSelection.start,
                    end: field.savedSelection.start + field.selection.length
                }
                field.savedSelection = newSelection
                // document.execCommand('delete')
                if (field.firstWord) {
                    document.execCommand('insertParagraph', false)
                }
                document.execCommand('insertText', false, field.selection)
            })
        }
        synonymsContainer.appendChild(synonym)
    }
    return synonymsContainer

}
export default createSynonymsList
