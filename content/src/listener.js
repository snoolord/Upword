import axios from 'axios';
import createDropdown from './dropdown/dropdown';

export const getWord = () => {
    let txt = window.getSelection() ||
              document.getSelection() ||
              document.selection.createRange();

    let selection = txt.toString().toLowerCase();
    let selectionCoordinates = txt.getRangeAt(0).getBoundingClientRect();

    let validSelection = selection.trim().length > 0 ? true : false;
    if (validSelection) {
        let url = `https://upword-server.herokuapp.com/word/${selection}`;
        axios.get(url).then(function(response){
            console.log(response.data);
            let upwordAnchor = document.getElementById('upword-anchor');
            let upwordDropdown = createDropdown(response.data, selectionCoordinates);
            console.log(upwordDropdown);
            upwordAnchor.appendChild(upwordDropdown);

        })
    }
}

export const getFieldsAndAddEventListeners = (queryString) => {
    let fields = document.querySelectorAll(queryString);
    let event = 'select';
    if (queryString === 'div[contenteditable="true"]') {
        event = 'dblclick'
    }
    if (fields.length > 0 ) {
        fields.forEach( field => {
            field.addEventListener(event, getWord);
        });
    }
}
