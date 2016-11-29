import {
  FETCH_SYNONYMS,
  receiveSynonyms
} from '../actions/synonyms_actions';

import {
  showList,
  hideList
} from '../actions/list_actions';

import { fetchSynonyms } from '../util/synonyms_api_util';

const SynonymsMiddleware = ({getState, dispatch}) => next => action => {
  const receiveSynonymsSuccess = (synonyms) =>{
    dispatch(receiveSynonyms(synonyms));
    dispatch(showList());
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
