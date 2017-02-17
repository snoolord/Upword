const createList = (partOfSpeech, definitions) => {
    console.log(definitions)
    let partOfSpeechList = document.createElement('div')
    partOfSpeechList.setAttribute('class', `part-of-speech-list`)
    partOfSpeechList.addEventListener('click', function () {
        console.log(this)
    });
    // partOfSpeechList.style.width = 100 + "px";
    // partOfSpeechList.style.width = 25 + "px";
    for (let i = 0; i < definitions.length; i++) {
        let currDef = definitions[i]
        let definitionLine = document.createElement('div')
        definitionLine.setAttribute('class', 'definition-line')
        definitionLine.innerHTML = currDef.definition
        partOfSpeechList.appendChild(definitionLine)
    }
    return partOfSpeechList
}

export default createList
