import createList from './dropdown-list'

const createDropdownTabsAndInfo = (dropdownContainer, wordInfo) => {
    let dropdownButtons = document.createElement('div')
    dropdownButtons.setAttribute('class', 'pos-buttons')
    let lists = []
    let first = 0
    for (let partOfSpeech in wordInfo) {
        if (partOfSpeech !== 'word') {
            let partOfSpeechButton = document.createElement('div')
            partOfSpeechButton.innerHTML = partOfSpeech
            partOfSpeechButton.setAttribute('id', `${partOfSpeech}-button`)
            partOfSpeechButton.setAttribute('class', 'pos-button')
            dropdownButtons.appendChild(partOfSpeechButton)
            partOfSpeechButton.addEventListener('click', function () {
                let activeButton = document.getElementsByClassName('pos-button active')[0]
                let activeList = document.getElementsByClassName('part-of-speech-list active')[0]
                activeButton.classList.remove('active')
                activeList.classList.remove('active')
                document.getElementById(`${this.innerHTML}-list`).classList.add('active')
                this.classList.add('active')
            })
            let list = createList(partOfSpeech, wordInfo[partOfSpeech])
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

export default createDropdownTabsAndInfo
