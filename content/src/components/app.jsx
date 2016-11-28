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
    $('body').on('dblclick', e => {
      let yPos = $(e.target).offset().top;
      let xPos = $(e.target).offset().left;
      let sel = window.getSelection();
      let range = sel.getRangeAt(0);
      if (range.startOffset !== range.endOffset) {
        range.deleteContents();
        range.insertNode(document.createTextNode("laddeedee"));
        let dropdown = $('.upword-dropdown');
        dropdown.css('display','block');
        dropdown.css('top', `${yPos + 20}px`);
        dropdown.css('left', `${xPos}px`);
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
