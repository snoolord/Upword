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
        that.word = $.trim(that.selection.toString()).toLowerCase();
        that.range  = that.selection.getRangeAt(0);
      }
      console.log(that.selection);
      this.sel = that.selection.focusNode;
      console.log(this.sel);
      if(that.word !== '') {
        document.execCommand('insertText',false , "");
        let span = document.createElement('span');
        span.setAttribute("id","upword");
        span.textContent = that.word;
        that.range.insertNode(span);
        chrome.storage.sync.get(that.word, (synonyms) => {
          if (Object.keys(synonyms).length === 0) {
            that.props.fetchSynonyms(that.word);
          } else {
            that.props.gotFromCache(synonyms[that.word]);
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
    let text = e.target.innerText;
    // document.execCommand('insertText', false , text);
    $('#upword').replaceWith(text);
    console.log(this.sel.parentElement);
    setTimeout(function() {
      this.sel.parentElement.focus();
    }.bind(this), 0);

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
