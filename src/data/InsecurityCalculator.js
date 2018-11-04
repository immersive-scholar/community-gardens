import ResourcesIncomingCalculator from "./calculators/ResourcesIncoming";
import EnergyOutgoingCalculator from "./calculators/EnergyOutgoing";
import CommunityFitnessCalculator from "./calculators/CommunityFitness";
import PersonalScarcityCalculator from "./calculators/PersonalScarcity";
import EmotionalHealthCalculator from "./calculators/EmotionalHealth";
import HealthCalculator from "./calculators/Health";

import BelowPovertyLine from "./stats/BelowPovertyLine";
import CommunityGarden from "./stats/CommunityGarden";
import DidNotEatForADay from "./stats/DidNotEatForADay";
import EarnALot from "./stats/EarnALot";
import EarnALotAndAreHungry from "./stats/EarnALotAndAreHungry";
import ExperienceHunger from "./stats/ExperienceHunger";
import FirstGeneration from "./stats/FirstGeneration";
import FoodInsecurity from "./stats/FoodInsecurity";
import HighGPA from "./stats/HighGPA";
import HighHealth from "./stats/HighHealth";
import HighResources from "./stats/HighResources";
import HousingInsecurity from "./stats/HousingInsecurity";
import Inhabitable from "./stats/Inhabitable";
import LowHealth from "./stats/LowHealth";
import OutOfState from "./stats/OutOfState";
import PellGrant from "./stats/PellGrant";
import SkipMeals from "./stats/SkipMeals";
import SleptOutside from "./stats/SleptOutside";
import Wellness from "./stats/Wellness";
import WorkALotAndAreHungry from "./stats/WorkALotAndAreHungry";
import {
  BELOW_POVERTY_LINE,
  COMMUNITY_GARDEN,
  DID_NOT_EAT_FOR_A_DAY,
  EARN_A_LOT,
  EARN_A_LOT_AND_ARE_HUNGRY,
  EXPERIENCE_HUNGER,
  FIRST_GENERATION,
  FOOD_INSECURITY,
  HIGH_GPA,
  HIGH_HEALTH,
  HIGH_RESOURCES,
  HOUSING_INSECURITY,
  INHABITABLE,
  LOW_HEALTH,
  OUT_OF_STATE,
  PELL_GRANT,
  SKIP_MEALS,
  SLEPT_OUTSIDE,
  WELLNESS,
  WORK_A_LOT_AND_ARE_HUNGRY
} from "../constants/Stats";

class InsecurityCalculator {
  static async parse(data) {
    return new Promise(resolve => {
      // let max = 0,
      // min = 0,
      // minData,
      // maxData;
      let total = 0;
      for (var i in data) {
        data[i].resourcesIncoming = ResourcesIncomingCalculator(data[i]);
        data[i].energyOutgoing = EnergyOutgoingCalculator(data[i]);
        data[i].communityFitness = CommunityFitnessCalculator(data[i]);
        data[i].personalScarcity = PersonalScarcityCalculator(data[i]);
        data[i].emotionalHealth = EmotionalHealthCalculator(data[i]);
        data[i].health = HealthCalculator(data[i]);

        // if (data[i].health < min) {
        //   minData = data[i];
        //   min = data[i].health;
        // }

        // if (data[i].health > max) {
        //   maxData = data[i];
        //   max = data[i].health;
        // }
        total++;
      }
      // console.log("min ", min, minData);
      // console.log("max ", max, maxData);

      // store keys as array for easier selection of elements by index
      // remember data is an object, with IDs as keys
      const keys = [];
      for (let ID in data) {
        if (data.hasOwnProperty(ID)) {
          keys.push(ID);
        }
      }

      // this could be more efficient as each Stat requires looping
      // over the entire array
      // but the trade-off is
      // it's easier to combine Filters
      // see WorkALotAndAreHungry for an example.
      const stats = {};
      // stats.belowPovertyLine = BelowPovertyLine(data, total);
      // stats.communityGarden = CommunityGarden(data, total);
      // stats.didNotEatForADay = DidNotEatForADay(data, total);
      // stats.earnALot = EarnALot(data);
      // stats.earnALotAndAreHungry = EarnALotAndAreHungry(data);
      // stats.experienceHunger = ExperienceHunger(data, total);
      // stats.firstGeneration = FirstGeneration(data, total);
      // stats.foodInsecurity = FoodInsecurity(data, total);
      // stats.highGPA = HighGPA(data, total);
      // stats.highHealth = HighHealth(data, 2);
      // stats.highResources = HighResources(data, 1);
      // stats.housingInsecurity = HousingInsecurity(data, total);
      // stats.inhabitable = Inhabitable(data);
      // stats.lowHealth = LowHealth(data, -2);
      // stats.outOfState = OutOfState(data);
      // stats.pellGrant = PellGrant(data);
      // stats.skipMeals = SkipMeals(data);
      // stats.sleptOutside = SleptOutside(data);
      // stats.wellness = Wellness(data);
      // stats.workALotAndAreHungry = WorkALotAndAreHungry(data);

      // console.log("stats ", stats);
      // console.log("data ", data);

      // store staticly, so data is accessible via
      // `InsecurityCalculator.data` and
      // `InsecurityCalculator.stats`
      InsecurityCalculator.data = data;
      InsecurityCalculator.stats = stats;
      InsecurityCalculator.total = total;
      InsecurityCalculator.keys = keys;

      resolve(data);
    });
  }

  /* eslint-disable no-unreachable */

  static calculateStat = function(label) {
    const { stats, total, data } = this;

    switch (label) {
      case BELOW_POVERTY_LINE:
        stats.belowPovertyLine = BelowPovertyLine(data, total);
        return stats.belowPovertyLine;
      case COMMUNITY_GARDEN:
        stats.communityGarden = CommunityGarden(data, total);
        return stats.communityGarden;
      case DID_NOT_EAT_FOR_A_DAY:
        stats.didNotEatForADay = DidNotEatForADay(data, total);
        return stats.didNotEatForADay;
      case EARN_A_LOT:
        stats.earnALot = EarnALot(data);
        return stats.earnALot;
      case EARN_A_LOT_AND_ARE_HUNGRY:
        stats.earnALotAndAreHungry = EarnALotAndAreHungry(data);
        return stats.earnALotAndAreHungry;
      case EXPERIENCE_HUNGER:
        stats.experienceHunger = ExperienceHunger(data, total);
        return stats.experienceHunger;
      case FIRST_GENERATION:
        stats.firstGeneration = FirstGeneration(data, total);
        return stats.firstGeneration;
      case FOOD_INSECURITY:
        stats.foodInsecurity = FoodInsecurity(data, total);
        return stats.foodInsecurity;
      case HIGH_GPA:
        stats.highGPA = HighGPA(data, total);
        return stats.highGPA;
      case HIGH_HEALTH:
        stats.highHealth = HighHealth(data, 2);
        return stats.highHealth;
      case HIGH_RESOURCES:
        stats.highResources = HighResources(data, 1);
        return stats.highResources;
      case HOUSING_INSECURITY:
        stats.housingInsecurity = HousingInsecurity(data, total);
        return stats.housingInsecurity;
      case INHABITABLE:
        stats.inhabitable = Inhabitable(data);
        return stats.inhabitable;
      case LOW_HEALTH:
        stats.lowHealth = LowHealth(data, -2);
        return stats.lowHealth;
      case OUT_OF_STATE:
        stats.outOfState = OutOfState(data);
        return stats.outOfState;
      case PELL_GRANT:
        stats.pellGrant = PellGrant(data);
        return stats.pellGrant;
      case SKIP_MEALS:
        stats.skipMeals = SkipMeals(data);
        return stats.skipMeals;
      case SLEPT_OUTSIDE:
        stats.sleptOutside = SleptOutside(data);
        return stats.sleptOutside;
      case WELLNESS:
        stats.wellness = Wellness(data);
        return stats.wellness;
      case WORK_A_LOT_AND_ARE_HUNGRY:
        stats.workALotAndAreHungry = WorkALotAndAreHungry(data);
        return stats.workALotAndAreHungry;
      default:
        break;
    }
    return stats;
  };
  /* eslint-enable no-unreachable */

  static getStat = function(label) {
    let stat = this.stats[label];
    if (!stat) {
      stat = InsecurityCalculator.calculateStat(label);
    }
    console.log("label ", stat);
    return stat;
  };

  static getRandomRows = function({ R, count = 1, key = "" }) {
    const rows = [];

    if (!key) {
      for (let i = 0, randomIndex, row; i < count; i++) {
        randomIndex = R.intBetween(0, this.total - 1);
        row = this.data[this.keys[randomIndex]];
        rows.push(row);
      }
    } else {
      const ids = this.stats[key].ids;
      const total = ids.length;
      for (let i = 0, randomIndex, row; i < count; i++) {
        randomIndex = R.intBetween(0, total - 1);
        row = this.data[ids[randomIndex]];
        rows.push(row);
      }
    }

    return rows;
  };
}

export default InsecurityCalculator;
