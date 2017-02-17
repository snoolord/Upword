const createList = (partOfSpeech, synonyms) => {
    console.log(synonyms);
    let partOfSpeechList = document.createElement('div');

    partOfSpeechList.setAttribute('id', partOfSpeech);
    partOfSpeechList.setAttribute('class', 'part-of-speech');
    partOfSpeechList.innerHTML = partOfSpeech;
    partOfSpeechList.addEventListener('click', function() {
        console.log(this);
    });

    partOfSpeechList.style.width = 100 + "px";
    partOfSpeechList.style.width = 25 + "px";

    return partOfSpeechList;
}

export default createList;
