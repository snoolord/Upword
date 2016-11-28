import { connect } from 'react-redux';
import { fetchSynonyms, clearSynonyms } from '../actions/synonyms_actions';
import App from './app';

const mapStateToProps = ({synonyms}) => ({
  synonyms
});

const mapDispatchToProps = dispatch => ({
  fetchSynonyms: word => dispatch(fetchSynonyms(word)),
  clearSynonyms: () => dispatch(clearSynonyms())  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
