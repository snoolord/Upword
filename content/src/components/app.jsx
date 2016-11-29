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
        document.execCommand('copy');
        // that.props.fetchSynonyms(that.word);
        // let activeNode = document.activeElement;
        // let deepestNode;
        // console.log(activeNode);
        // if (activeNode.childNodes.length === 1) {
        //   deepestNode = that.findDeepestNestedChildNode(activeNode.childNodes);
        //   console.log(deepestNode);
        // }
        // console.log(deepestNode, "DEEPEST NODE");
        // let innerHTML = that.range.commonAncestorContainer.parentElement.innerHTML.split('');
        // let start = that.range.startOffset;
        // let end = that.range.endOffset;
        // let left = innerHTML.slice(0, start);
        // let middle = innerHTML.slice(start, end);
        // let right = innerHTML.slice(end);
        // console.log(left, "LEFT");
        // console.log(middle, "middle");
        // console.log(right, "right");
        // middle = "word";
        //
        // that.range.commonAncestorContainer.parentElement.innerHTML = left.join('') + middle + right.join('');
        // console.log(that.range);
        that.range.deleteContents();
        // console.log(window.clipboardData);
        // document.execCommand('paste');

        // that.range.insertNode(document.createTextNode('hello boys'));
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
    this.showList();
    return(
      <div className="upword-dropdown">
        {this.showSynonyms()}
      </div>
    );
  }
}

export default App;
