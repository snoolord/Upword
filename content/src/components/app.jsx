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
      let selection = window.getSelection() || document.getSelection() || document.selection.createRange();
      let coords = selection.getRangeAt(0).getBoundingClientRect();
      let word = $.trim(selection.toString());
      let range  = selection.getRangeAt(0);
      if(word !== '') {
        that.props.fetchSynonyms(word);
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

  render() {
    return(
      <div className="upword-dropdown">
        {this.showSynonyms()}
      </div>
    );
  }
}

export default App;
