import createList from './dropdown-list'
import createRelatedList from './related/related-list'

const createDropdownTabsAndInfo = (field, dropdownContainer, wordInfo) => {
    console.log(field)
    let dropdownButtons = document.createElement('div')
    dropdownButtons.setAttribute('class', 'pos-buttons')
    let lists = []
    let first = 0
    if (wordInfo.related) {
        let notFoundButton = createTabButton('Did you mean')
        dropdownButtons.appendChild(notFoundButton)
        let relatedList = createRelatedList(field, wordInfo.related)
        dropdownContainer.appendChild(dropdownButtons)
        dropdownContainer.appendChild(relatedList)
    } else {
        for (let partOfSpeech in wordInfo) {
            if (partOfSpeech !== 'word' && partOfSpeech !== 'related') {
                let partOfSpeechButton = createTabButton(partOfSpeech, partOfSpeech)
                // let partOfSpeechButton = document.createElement('div')
                // partOfSpeechButton.innerHTML = partOfSpeech
                // partOfSpeechButton.setAttribute('id', `${partOfSpeech}-button`)
                // partOfSpeechButton.setAttribute('class', 'pos-button')
                dropdownButtons.appendChild(partOfSpeechButton)
                partOfSpeechButton.addEventListener('click', function () {
                    let activeButton = document.getElementsByClassName('pos-button active')[0]
                    let activeList = document.getElementsByClassName('part-of-speech-list active')[0]
                    activeButton.classList.remove('active')
                    activeList.classList.remove('active')
                    document.getElementById(`${partOfSpeech}-list`).classList.add('active')
                    this.classList.add('active')
                })
                let list = createList(field, partOfSpeech, wordInfo[partOfSpeech])
                if (first === 0) {
                    partOfSpeechButton.classList.add('active')
                    list.classList.add('active')
                    first++
                }
                lists.push(list)
                // dropdownContainer.appendChild(list);
                // upwordDropdown.appendChild(list);
            }
        }
        dropdownContainer.appendChild(dropdownButtons)
        lists.forEach(list => {
            dropdownContainer.appendChild(list)
        })
    }
}

var createTabButton = (innerText, partOfSpeech) => {
    if (!partOfSpeech) partOfSpeech = 'related'
    let partOfSpeechButton = document.createElement('div')
    let posButtonText = document.createElement('div')
    partOfSpeechButton.appendChild(posButtonText)
    posButtonText.setAttribute('class', 'pos-button-text')
    posButtonText.innerHTML = innerText
        if (partOfSpeech === 'related') {
            let relatedWordHover = document.createElement('div')
            relatedWordHover.setAttribute('id', 'related-word')
            partOfSpeechButton.appendChild(relatedWordHover)
        }
        partOfSpeechButton.setAttribute('id', `${partOfSpeech}-button`)
        partOfSpeechButton.setAttribute('class', 'pos-button')
    return partOfSpeechButton
}
export default createDropdownTabsAndInfo
