import React from 'react';
import $ from 'jquery';
import './jquery.hotkeys.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.synClick = this.synClick.bind(this);
    this.sel = '';
  }

  componentDidMount() {
    this.hotkey();
    this.clickHandler();
  }
  componentWillUnmount() {
    this.props.clearSynonyms();
  }
  hotkey() {
    $('body').bind('keydown', 'ctrl+a', ()=>{
      let dropdown = $('.upword-dropdown');
      dropdown.css('display','block');
    });
  }

  clickHandler() {
     let that = this;
     $('body').dblclick(function(e) {
       that.selection = window.getSelection() || document.getSelection() || document.selection.createRange();
       if (that.selection.anchorNode !== null) {
         that.coords = that.selection.getRangeAt(0).getBoundingClientRect();
         that.word = $.trim(that.selection.toString());
         that.range  = that.selection.getRangeAt(0);
       }
       this.sel = that.selection.focusNode;
       if(that.word !== '') {
         // right now the word is highlighted
         // we use execCommand to "paste" an empty string to "remove it"
         document.execCommand('insertText',false , "");
         let lowercaseWord = that.word.toLowerCase();
         chrome.storage.sync.get(lowercaseWord, (synonyms) => {
           if (Object.keys(synonyms).length === 0) {
             that.props.fetchSynonyms(lowercaseWord);
           } else {
             that.props.gotFromCache(synonyms[lowercaseWord]);
           }
         });
       }
     }.bind(this));
     // $('body').on('click', e => {
     //   $('.upword-dropdown').css('display', 'none');
     //   this.props.hideList();
     //   this.props.clearSynonyms();
     // });
   }


  synClick(e) {
    e.preventDefault();
    let text = e.target.innerText;
    // $('#upword').replaceWith(text);
    // on click on the li it loses "focus" on the text input
    // this setTimeout function allows us to focus back into the element
    // inside the function we are inserting the text that was selected
    setTimeout(function() {
      this.sel.parentElement.focus();
      document.execCommand('insertText', false , text + " ");
    }.bind(this), 0);
    this.sel.parentElement.focus();
    $('.upword-dropdown').css('display', 'none');
  }

  showSynonyms() {
    return(
      this.props.synonyms.slice(0,5).map((word, idx) => (
        <li key={idx} onClick={this.synClick}>{word}</li>
      ))
    );
  }

  showList() {
    if (this.props.showList) {
      let dropdown = $('.upword-dropdown');
      let top = this.coords.top;
      let left = this.coords.left;
      dropdown.css('display','block');
      dropdown.css('top', `${top + window.pageYOffset + this.coords.height}px`);
      dropdown.css('left', `${left - 10}px`);
    }
  }

  render() {
    this.showList();
    return(
      <div className="upword-dropdown">
        {this.showSynonyms()}
      </div>
    );
  }
}

export default App;
