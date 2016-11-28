import { RECEIVE_SYNONYMS } from '../actions/synonyms_actions';

const SynonymsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SYNONYMS:
      return action.synonyms.synonyms;
    default:
      return state;
  }
};

export default SynonymsReducer;
