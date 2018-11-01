import { SET_TIME_MULTIPLIER } from "constants/Constants";
const queryString = require("query-string");

const location = window.location;

const parsed = queryString.parse(location.search);
const timeMultiplier = parseFloat(parsed.timeMultiplier) || 1;

const initialState = { timeMultiplier };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TIME_MULTIPLIER:
      const { timeMultiplier } = action.payload.data;
      return {
        ...state,
        timeMultiplier
      };
    default:
      return state;
  }
};

// export const getSelection = state => state.node[state.selectedId];
