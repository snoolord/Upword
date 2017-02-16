const createDropdown = (wordInfo, selectionCoordinates) => {
    console.log(wordInfo);
    let upwordDropdown = document.createElement('div');

    upwordDropdown.setAttribute('class', 'upword-dropdown');
    upwordDropdown.style.top = selectionCoordinates.bottom + "px";
    upwordDropdown.style.left = selectionCoordinates.left + "px";
    upwordDropdown.style.width = 100 + "px";
    upwordDropdown.style.height = 100 + "px";
    for (let partOfSpeech in wordInfo) {
        if (partOfSpeech !== 'word') {
            let list = createList(partOfSpeech, wordInfo[partOfSpeech]);
            upwordDropdown.appendChild(list);
        }
    }
    return upwordDropdown;
}

const createList = (partOfSpeech, synonyms) => {
    let partOfSpeechDiv = document.createElement('div');
    partOfSpeechDiv.setAttribute('id', partOfSpeech);
    partOfSpeechDiv.setAttribute('class', 'part-of-speech');
    partOfSpeechDiv.innerHTML = partOfSpeech;
    partOfSpeechDiv.addEventListener('click', function() {
        console.log(this);
    });
    partOfSpeechDiv.style.width = 100 + "px";
    partOfSpeechDiv.style.width = 25 + "px";

    return partOfSpeechDiv;
}

export default createDropdown;
