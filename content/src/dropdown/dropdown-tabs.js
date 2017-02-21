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
    partOfSpeechButton.setAttribute('class', 'pos-button')
    partOfSpeechButton.setAttribute('id', `${partOfSpeech}-button`)

    if (partOfSpeech === 'related') {
        let relatedWordHover = document.createElement('div')
        partOfSpeechButton.innerHTML = 'Did you mean'
        relatedWordHover.setAttribute('id', 'related-word')
        partOfSpeechButton.appendChild(relatedWordHover)
    } else {
        let buttonSVG = createSVG(innerText)
        partOfSpeechButton.appendChild(buttonSVG)
    }
    return partOfSpeechButton
}

const createSVG = (innerText) => {
    let buttonSVG = document.createElementNS('http://www.w3.org/2000/buttonSVG', 'svg')
    // buttonSVG.setAttributeNS(null, 'class', 'pos-button')
    buttonSVG.setAttributeNS(null, 'viewBox', '0 0 120 40')
    buttonSVG.setAttributeNS(null, 'preserveAspectRatio', 'none')
    buttonSVG.setAttributeNS(null, 'width', '20%')
    // buttonSVG.setAttributeNS(null, 'id', `${partOfSpeech}-button`)
    let svgNS = buttonSVG.namespaceURI
    let path = document.createElementNS(svgNS, 'path')
    path.setAttributeNS(null, 'd', 'M20,0            L100,0            L120,30            L0,30z')
    path.setAttributeNS(null, 'fill', '#eee')
    let text = document.createElementNS(svgNS, 'text')
    text.setAttributeNS(null, 'x', '50%')
    text.setAttributeNS(null, 'y', '50%')
    text.setAttributeNS(null, 'text-anchor', 'middle')
    text.setAttributeNS(null, 'font-family', 'Verdana')
    text.setAttributeNS(null, 'font-size', '10')
    text.setAttributeNS(null, 'fill', 'blue')
    text.innerHTML = innerText
    buttonSVG.appendChild(path)
    buttonSVG.appendChild(text)
    return buttonSVG
}
export default createDropdownTabsAndInfo
