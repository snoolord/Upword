export const FETCH_SYNONYMS = 'FETCH_SYNONYMS';
export const RECEIVE_SYNONYMS = 'RECEIVE_SYNONYMS';
export const CLEAR_SYNONYMS = 'CLEAR_SYNONYMS';

export const fetchSynonyms = (word) => ({
  type: FETCH_SYNONYMS,
  word
});

export const receiveSynonyms = (synonyms) => ({
  type: RECEIVE_SYNONYMS,
  synonyms
});

export const clearSynonyms = () => ({
  type: CLEAR_SYNONYMS
});
