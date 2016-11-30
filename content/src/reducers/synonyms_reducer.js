import { RECEIVE_SYNONYMS, CLEAR_SYNONYMS, GOT_FROM_CACHE } from '../actions/synonyms_actions';

const SynonymsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SYNONYMS:
      if (action.synonyms.synonyms.length === 0) {
        return ["No Results Found"];
      } else {
        return action.synonyms.synonyms;
      }
    case CLEAR_SYNONYMS:
      return [];
    case GOT_FROM_CACHE:
      if (action.synonyms.length === 0) {
        return ["No Results Found"];
      } else {
      return action.synonyms;
      }
    default:
      return state;
  }
};

export default SynonymsReducer;
