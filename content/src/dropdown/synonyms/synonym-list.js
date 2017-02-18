const createSynonymsList = (synonyms) => {
    console.log(synonyms)
    let synonymsContainer = document.createElement('div')
    synonymsContainer.setAttribute('class', 'synonyms-container')
    for (let i = 0; i < synonyms.length; i++) {
        let synonym = document.createElement('div')
        synonym.setAttribute('class', 'synonym')
        synonym.innerHTML = synonyms[i]
        synonymsContainer.appendChild(synonym)
    }
    return synonymsContainer

}
export default createSynonymsList
