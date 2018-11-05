import { ADD_CHAPTER, FOCUS_CHAPTER } from "constants/Constants";
import addCollectionToNode from "util/AddCollectionToNode";

const initialState = {
  node: {
    didNotEatForADay: {
      id: "didNotEatForADay",
      title: "Did Not Eat for a Day",
      link: "/garden/did-not-eat-for-a-day"
    },
    firstGeneration: {
      id: "firstGeneration",
      title: "First Generation",
      link: "/garden/first-generation"
    },
    highGPA: { id: "highGPA", title: "High GPA", link: "/garden/high-gpa" },
    housingInsecurity: {
      id: "housingInsecurity",
      title: "Housing Insecurity",
      link: "/garden/housing-insecurity"
    },
    outOfState: {
      id: "outOfState",
      title: "Out of State",
      link: "/garden/out-of-state"
    },
    pellGrant: {
      id: "pellGrant",
      title: "Pell Grant",
      link: "/garden/pell-grant"
    },
    randomGarden: {
      id: "randomGarden",
      title: "Random Garden",
      link: "/garden/random-garden"
    },
    resourced: {
      id: "resourced",
      title: "High Resources",
      link: "/garden/resourced"
    },
    summerGarden: {
      id: "summerGarden",
      title: "Summer Garden",
      link: "/garden/summer-garden"
    },
    wellness: {
      id: "wellness",
      title: "Wellness Garden",
      link: "/garden/wellness"
    },
    winterGarden: {
      id: "winterGarden",
      title: "Winter Garden",
      link: "/garden/winter-garden"
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

export const getSelection = state => state.node[state.selectedID];
