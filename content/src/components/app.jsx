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
      that.coords = that.selection.getRangeAt(0).getBoundingClientRect();
      that.word = $.trim(that.selection.toString());
      that.range  = that.selection.getRangeAt(0);
      if(that.word !== '') {
        that.props.fetchSynonyms(that.word);

        that.range.deleteContents();
        that.range.insertNode(document.createTextNode('hello boys'));
      }
    });
    $('body').on('click', e => {
      $('.upword-dropdown').css('display', 'none');
      this.props.hideList();
      this.props.clearSynonyms();
    });
  }

  showSynonyms() {
    if ( this.props.synonyms[0] === "No Results Found") {
      return <div>No Results Found</div>;
    } else if ( this.props.synonyms.length !== 0 ) {
      return this.props.synonyms.map((synonym, index)=> {
        return <li key={index}> {index+1}. {synonym}</li>;
      });
    } else {
      return <div></div>;
    }
  }

  showList() {
    if (this.props.showList) {
      let dropdown = $('.upword-dropdown');
      let top = this.coords.top;
      let left = this.coords.left;
      dropdown.css('display','block');
      dropdown.css('top', `${top + window.pageYOffset + this.coords.height}px`);
      dropdown.css('left', `${left}px`);
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
    let activeNode = document.activeElement;
    console.log(activeNode);
    if (activeNode.childNodes.length === 1) {
      let deepestNode = this.findDeepestNestedChildNode(activeNode.childNodes);
      console.log(deepestNode);
    }
    this.showList();
    return(
      <div className="upword-dropdown">
        {this.showSynonyms()}
      </div>
    );
  }
}

export default App;
