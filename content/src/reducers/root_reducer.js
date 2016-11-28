import {combineReducers} from 'redux';
import SynonymsReducer from './synonyms_reducer';

const RootReducer = combineReducers({
  synonyms: SynonymsReducer
});

export default RootReducer;
