import { RECEIVE_SYNONYMS } from '../actions/synonyms_actions';

const _defaultSynonyms = [];

const SynonymsReducer = (state = _defaultSynonyms, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SYNONYMS:
      return action.synonyms;
    default:
      return state;
  }
};

export default SynonymsReducer;
