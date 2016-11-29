import { RECEIVE_SYNONYMS, CLEAR_SYNONYMS } from '../actions/synonyms_actions';

const _defaultState = {
  synonyms: []
};

const SynonymsReducer = (state = [], action) => {
  console.log(action);
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
    default:
      return state;
  }
};

export default SynonymsReducer;
