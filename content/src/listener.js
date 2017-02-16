
export const getWord = () => {
    let txt = window.getSelection() ||
              document.getSelection() ||
              document.selection.createRange();

    let selection = txt.toString();

    let validSelection = selection.trim().length > 0 ? true : false;
    if (validSelection) {
        console.log(selection);
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
