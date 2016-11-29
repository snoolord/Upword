import { SHOW_LIST, HIDE_LIST } from '../actions/list_actions';


const ListReducer = (state = false, action) => {
  Object.freeze(state);
  switch (action.type) {
    case SHOW_LIST:
      return true;
    case HIDE_LIST:
      return false;
    default:
      return state;
  }
};

export default ListReducer;
