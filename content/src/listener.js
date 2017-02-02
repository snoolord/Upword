
export const getWord = () => {
    var txt = '';
    txt = window.getSelection() ||
          document.getSelection() ||
          document.selection.createRange();
    console.log(txt.toString());
    return txt;
}

export const getFieldsAndAddEventListeners = (queryString) => {
    let fields = document.querySelectorAll(queryString);
    let event = 'select';
    if (queryString === 'div[contenteditable="true"]') {
        event = 'mouseup'
    }
    if (fields.length > 0 ) {
        fields.forEach( field => {
            field.addEventListener(event, getWord);
        });
    }
}
