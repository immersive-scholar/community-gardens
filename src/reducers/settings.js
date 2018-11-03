import {
  SET_TIME_MULTIPLIER,
  SET_QUANTITY_MULTIPLIER
} from "constants/Constants";
import { TweenMax } from "gsap";
const queryString = require("query-string");

const location = window.location;

const parsed = queryString.parse(location.search);
const timeMultiplier = parseFloat(parsed.timeMultiplier) || 1;
const quantityMultiplier = parseFloat(parsed.quantityMultiplier) || 1;

const initialState = { timeMultiplier, quantityMultiplier };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TIME_MULTIPLIER:
      const { timeMultiplier } = action.payload.data;
      TweenMax.globalTimeScale(timeMultiplier);

      return {
        ...state,
        timeMultiplier
      };
    case SET_QUANTITY_MULTIPLIER:
      const { quantityMultiplier } = action.payload.data;

      return {
        ...state,
        quantityMultiplier
      };
    default:
      return state;
  }
};

// export const getSelection = state => state.node[state.selectedId];
