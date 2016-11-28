import { connect } from 'react-redux';
import { fetchSynonyms } from '../actions/synonyms_actions';
import App from './app';

const mapStateToProps = ({synonyms}) => ({
  synonyms
});

const mapDispatchToProps = dispatch => ({
  fetchSynonyms: word => dispatch(fetchSynonyms(word))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
