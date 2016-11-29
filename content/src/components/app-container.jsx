// Importing necessary files
import { connect } from 'react-redux';
// Importing actions from actions folder
import { fetchSynonyms, clearSynonyms } from '../actions/synonyms_actions';
import { hideList } from '../actions/list_actions';
// Import app component from app.jsx
import App from './app';

const mapStateToProps = ({synonyms}) => ({
  synonyms
});

const mapDispatchToProps = dispatch => ({
  fetchSynonyms: word => dispatch(fetchSynonyms(word)),
  clearSynonyms: () => dispatch(clearSynonyms()),
  hideList: () => dispatch(hideList())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
