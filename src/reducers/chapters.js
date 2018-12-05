import camelCase from "lodash/camelCase";

import { ADD_CHAPTER, FOCUS_CHAPTER } from "constants/Constants";
import addCollectionToNode from "util/AddCollectionToNode";
import {
  AgeModel,
  AnxietyModel,
  DegreeModel,
  EnergyOutgoingModel,
  FirstGenerationModel,
  FoodInsecurityModel,
  HighResourcesModel,
  HighGPAModel,
  HousingInsecurityModel,
  OutOfStateModel,
  RandomGardenModel,
  SummerGardenModel,
  WinterGardenModel,
  XmasCardModel
} from "models";

const initialState = {
  node: {
    age: AgeModel,
    anxiety: AnxietyModel,
    degree: DegreeModel,
    didNotEatForADay: {
      id: "did-not-eat-for-a-day",
      title: "Did Not Eat for a Day",
      link: "/garden/did-not-eat-for-a-day"
    },
    energyOutgoing: EnergyOutgoingModel,
    firstGeneration: FirstGenerationModel,
    foodInsecurity: FoodInsecurityModel,
    highGpa: HighGPAModel,
    housingInsecurity: HousingInsecurityModel,
    outOfState: OutOfStateModel,
    pellGrant: {
      id: "pell-grant",
      title: "Pell Grant",
      link: "/garden/pell-grant"
    },
    randomGarden: RandomGardenModel,
    resourced: HighResourcesModel,
    summerGarden: SummerGardenModel,
    wellness: {
      id: "wellness",
      title: "Wellness Garden",
      link: "/garden/wellness"
    },
    winterGarden: WinterGardenModel,
    xmasCard: XmasCardModel
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
