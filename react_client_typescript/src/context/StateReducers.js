import { REDUCER_CASES } from "./constants";

export const initialState = {
  userInfo: undefined,
  newUser: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case REDUCER_CASES.SET_USER_INFO:
      console.log("inside -> ", action.userInfo);
      return {
        ...state,
        userInfo: action.userInfo,
      };

    case REDUCER_CASES.SET_NEW_USER:
      return {
        ...state,
        newUser: action.newUser,
      };

    default:
      return state;
  }
};

export default reducer;
