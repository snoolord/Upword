const createSynonymsList = (synonyms) => {
    console.log(synonyms)
    let synonymsContainer = document.createElement('div')
    synonymsContainer.setAttribute('class', 'synonyms-container')
    for (let i = 0; i < synonyms.length; i++) {
        let synonym = document.createElement('div')
        synonym.setAttribute('class', 'synonym')
        synonym.innerHTML = synonyms[i]
        synonym.addEventListener('click', function (e) {
            let field = document.getElementById(':nn')
            console.log(field)
            field.focus()
            document.execCommand('delete')
            document.execCommand('insertText', false, synonyms[i])
        })
        synonymsContainer.appendChild(synonym)
    }
    return synonymsContainer

}
export default createSynonymsList
