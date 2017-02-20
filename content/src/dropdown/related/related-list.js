const createRelatedList = (field, relatedWords) => {
    let relatedListContainer = document.createElement('div')
    relatedListContainer.setAttribute('id', 'related')
    for (let i = 0; i < relatedWords.length; i++) {
        let wordA = document.createElement('div')
        wordA.setAttribute('class', 'related-word-link')
        // wordA.setAttribute('href', `http://www.dictionary.com/browse/${relatedWords[i]}?s=t`)
        wordA.addEventListener('click', function () {
            field.focus()
            document.execCommand('delete')
            document.execCommand('insertText', false, relatedWords[i])
            document.getElementsByClassName('upword-dropdown')[0].remove()
        })

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
