import camelCase from "lodash/camelCase";

import { ADD_CHAPTER, FOCUS_CHAPTER } from "constants/Constants";
import addCollectionToNode from "util/AddCollectionToNode";
import {
  SummerGardenModel,
  HousingInsecurityModel,
  HighResourcesModel,
  EnergyOutgoingModel,
  FirstGenerationModel,
  WinterGardenModel,
  RandomGardenModel
} from "models";

const initialState = {
  node: {
    summerGarden: SummerGardenModel,
    winterGarden: WinterGardenModel,
    didNotEatForADay: {
      id: "did-not-eat-for-a-day",
      title: "Did Not Eat for a Day",
      link: "/garden/did-not-eat-for-a-day"
    },
    firstGeneration: FirstGenerationModel,
    highGPA: { id: "highGPA", title: "High GPA", link: "/garden/high-gpa" },
    housingInsecurity: HousingInsecurityModel,
    outOfState: {
      id: "out-of-state",
      title: "Out of State",
      link: "/garden/out-of-state"
    },
    pellGrant: {
      id: "pell-grant",
      title: "Pell Grant",
      link: "/garden/pell-grant"
    },
    randomGarden: RandomGardenModel,
    resourced: HighResourcesModel,
    energyOutgoing: EnergyOutgoingModel,
    wellness: {
      id: "wellness",
      title: "Wellness Garden",
      link: "/garden/wellness"
    }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHAPTER:
      return {
        ...state,
        node: addCollectionToNode(action.payload.data.files, state.node)
      };
    case FOCUS_CHAPTER:
      let id = action.payload.data.id;
      return {
        ...state,
        selectedID: id
      };
    default:
      return state;
  }
};

// need a more explicit dictionary of urls to chapters.
// this is too easy to make a mistake with.
export const getSelectedChapter = state => {
  const key = camelCase(state.selectedID);
  return state.node[key];
};
