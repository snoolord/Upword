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
      }
    });
    $('body').on('click', e => {
      $('.upword-dropdown').css('display', 'none');
      this.props.hideList();
      this.props.clearSynonyms();
    });
  }

  synClick(e) {
    let text = e.target.innerText;
  }

  showSynonyms() {
    if ( this.props.synonyms[0] === "No Results Found") {
      return <div>No Results Found</div>;
    } else if ( this.props.synonyms.length !== 0 ) {
      return this.props.synonyms.slice(0,5).map((synonym, index)=> {
        return <li onClick={this.synClick} key={index}>{synonym}</li>;
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
