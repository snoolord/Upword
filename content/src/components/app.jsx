import React from 'react';
import $ from 'jquery';
import './jquery.hotkeys.js';

class App extends React.Component {

  componentDidMount() {
    this.clickHandler();
    this.hotkey();
  }

  hotkey() {
    $('body').bind('keydown', 'ctrl+a', ()=>{
      let dropdown = $('.upword-dropdown');
      dropdown.css('display','block');
    });
  }

  clickHandler() {
    $('body').dblclick(function(e) {
        let selection = window.getSelection() || document.getSelection() || document.selection.createRange();
        let coords = selection.getRangeAt(0).getBoundingClientRect();
        let word = $.trim(selection.toString());
        let range  = selection.getRangeAt(0);
        if(word != '') {
          let top = coords.top;
          let left = coords.left;
          let dropdown = $('.upword-dropdown');
          range.deleteContents();
          range.insertNode(document.createTextNode('hello boys'));
          dropdown.css('display','block');
          dropdown.css('top', `${top + window.pageYOffset + coords.height}px`);
          dropdown.css('left', `${left}px`);
        }
    });
    $('body').on('click', e => {
      $('.upword-dropdown').css('display', 'none');
    });
  }

  render() {
    return(
      <div className="upword-dropdown">
        <h1>Hello from upword</h1>
      </div>
    )
  }
}

export default App;
