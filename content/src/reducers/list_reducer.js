import { SHOW_LIST, HIDE_LIST } from '../actions/list_actions';
import { GOT_FROM_CACHE } from '../actions/synonyms_actions';


const ListReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SHOW_LIST:
      return true;
    case HIDE_LIST:
      return false;
    case GOT_FROM_CACHE:
      return true;
    default:
      return state;
  }
};

export default ListReducer;
