const createSynonymsList = (field, synonyms) => {
    let synonymsContainer = document.createElement('div')
    synonymsContainer.setAttribute('class', 'synonyms-container')
    for (let i = 0; i < synonyms.length; i++) {
        let synonym = document.createElement('div')
        synonym.setAttribute('class', 'synonym')
        synonym.innerHTML = synonyms[i]
        synonym.addEventListener('click', function (e) {
            console.log(field)
            field.focus()
            document.execCommand('delete')
            document.execCommand('insertText', false, synonyms[i])
            document.getElementsByClassName('upword-dropdown')[0].remove()
        })
        synonymsContainer.appendChild(synonym)
    }
    return synonymsContainer

}
export default createSynonymsList
