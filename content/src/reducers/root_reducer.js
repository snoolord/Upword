import {combineReducers} from 'redux';
import SynonymsReducer from './synonyms_reducer';
import ListReducer from './list_reducer';

const RootReducer = combineReducers({
  synonyms: SynonymsReducer,
  showList: ListReducer
});

export default RootReducer;
