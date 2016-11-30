import React from 'react';
import $ from 'jquery';
import './jquery.hotkeys.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
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

      if(that.word !== '') {
        // document.execCommand('insertText',false , "hello");
        that.props.fetchSynonyms(that.word);
      }
    });
    // $('body').on('click', e => {
    //   $('.upword-dropdown').css('display', 'none');
    //   this.props.hideList();
    //   this.props.clearSynonyms();
    // });
  }

  synClick(e) {
    let text = e.target.innerText;
    console.log(text);
  }

  showSynonyms() {
    return(
      this.props.synonyms.map((word, idx) => (
        <li key={idx} onClick={this.synClick}>{word}</li>
      ))
    )
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

  findDeepestNestedChildNode(node) {
    if (node[0].childNodes.length === 0) {
      return node;
    }
    node = node[0].childNodes;
    return this.findDeepestNestedChildNode(node);
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
