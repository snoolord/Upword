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
    chrome.storage.sync.set({[synonyms.word]: synonyms.synonyms})
    dispatch(receiveSynonyms(synonyms));
    dispatch(showList());
  };

  switch (action.type) {
    case FETCH_SYNONYMS:
      fetchSynonyms(action.word, receiveSynonymsSuccess);
      return next(action);
    default:
      return next(action);
  }
};

export default SynonymsMiddleware;
