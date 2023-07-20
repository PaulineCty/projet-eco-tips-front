import { SAVE_ALL_PROPOSALS, SEND_ALL_ACHIEVEMENTS } from '@/actions/admin';
import { SAVE_ALL_USERS } from '../actions/admin';

export const initialState = {
  proposals: [],
  achievements: [],
  users: []
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_ALL_PROPOSALS:
      return { ...state, proposals: action.proposals };
    case SAVE_ALL_USERS:
      return { ...state, users: action.users };
    case SEND_ALL_ACHIEVEMENTS:
      return { ...state, achievements: action.achievements };
    default:
      return state;
  }
};

export default reducer;
