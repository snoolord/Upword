
export const getWord = () => {
    var txt = '';
    txt = window.getSelection() ||
          document.getSelection() ||
          document.selection.createRange();
    console.log(txt.toString());
    return txt;
}
