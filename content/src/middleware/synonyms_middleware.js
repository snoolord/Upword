import {
  FETCH_SYNONYMS,
  receiveSynonyms
} from '../actions/synonyms_actions';

import { fetchSynonyms } from '../util/synonyms_api_util';

const SynonymsMiddleware = ({getState, dispatch}) => next => action => {
  const receiveSynonymsSuccess = (synonyms) =>{
    dispatch(receiveSynonyms(synonyms));
  };

  switch (action.type) {
    case FETCH_SYNONYMS:
    console.log("fetching synonyms");
      fetchSynonyms(action.word, receiveSynonymsSuccess);
      return next(action);
    default:
      return next(action);
  }
};

export default SynonymsMiddleware;
