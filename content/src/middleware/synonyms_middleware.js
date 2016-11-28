import {
  FETCH_SYNONYMS,
  recieveSynonyms
} from '../actions/synonyms_actions';

import { fetchSynonyms } from '../util/synonyms_api_util';

const SynonymsMiddleware = ({getState, dispatch}) => next => action => {
  const recieveSynonymsSuccess = (synonyms) => dispatch(recieveSynonyms(synonyms));

  switch (action.type) {
    case FETCH_SYNONYMS:
      fetchSynonyms(action.word, recieveSynonymsSuccess);
      return next(action);
    default:
      return next(action);
  }
};

export default SynonymsMiddleware;
