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
        var selection = window.getSelection() || document.getSelection() || document.selection.createRange();
        var coords = selection.getRangeAt(0).getBoundingClientRect();
        var word = $.trim(selection.toString());
        let range = selection.getRangeAt(0);
        console.log(coords);
        if(word !== '') {
          let top = coords.top;
          let left = coords.left;
          range.deleteContents();
          range.insertNode(document.createTextNode("laddeedee"));
          let dropdown = $('.upword-dropdown');
          dropdown.css('display','block');
          dropdown.css('top', `${top + window.pageYOffset + 20}px`);
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
        <h1>Hello upword</h1>
      </div>
    );
  }
}

export default App;
