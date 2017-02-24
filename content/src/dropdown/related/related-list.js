const createRelatedList = (field, relatedWords) => {
    let relatedListContainer = document.createElement('div')
    relatedListContainer.setAttribute('id', 'related')
    for (let i = 0; i < relatedWords.length; i++) {
        let wordA = document.createElement('div')
        wordA.setAttribute('class', 'related-word-link')
        // wordA.setAttribute('href', `http://www.dictionary.com/browse/${relatedWords[i]}?s=t`)
        if (field.field) {
            wordA.addEventListener('click', function () {
                // TODO: find out how to change the word in the innerHTML on hover
                // need to set the selection
                field.field.focus()
                // let range = document.createRange()

                document.execCommand('delete')

                document.execCommand('insertText', false, relatedWords[i])
                // range.setStart(field.field, field.selectionStart)
                // range.setEnd(field.field, field.selectionStart + relatedWords[i].length)
                document.getElementsByClassName('upword-dropdown')[0].remove()
            })
        }

        wordA.addEventListener('mouseover', function () {
            let relatedWordHoverField = document.getElementById('related-word')
            relatedWordHoverField.innerHTML = ' ' + relatedWords[i]
        })
        wordA.innerHTML = relatedWords[i]
        relatedListContainer.appendChild(wordA)
    }
    return relatedListContainer
}

export default createRelatedList
