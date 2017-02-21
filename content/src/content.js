import { mutationObserver } from './mutation-observer'

console.log('JavaScript successfully injected')
mutationObserver()

const anchor = document.createElement('div')
anchor.id = 'upword-anchor'
document.body.insertBefore(anchor, document.body.childNodes[0])

const link = document.createElement('link')
link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Raleway')
link.setAttribute('rel', 'stylesheet')

document.head.appendChild(link)
