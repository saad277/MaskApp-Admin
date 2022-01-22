import { ME_SUCCESS, LOG_OUT } from "../actions";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ME_SUCCESS:
      return {
        ...state,
        user: {
          ...action.payload,
        },
        isAuthenticated: true,
      };

    case LOG_OUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
