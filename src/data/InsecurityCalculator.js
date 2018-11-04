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
import FoodInsecurity from "./stats/FoodInsecurity";
import HighGPA from "./stats/HighGPA";
import HousingInsecurity from "./stats/HousingInsecurity";
import Inhabitable from "./stats/Inhabitable";
import PellGrant from "./stats/PellGrant";
import SkipMeals from "./stats/SkipMeals";
import SleptOutside from "./stats/SleptOutside";
import WorkALotAndAreHungry from "./stats/WorkALotAndAreHungry";

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
      stats.belowPovertyLine = BelowPovertyLine(data, total);
      stats.communityGarden = CommunityGarden(data, total);
      stats.didNotEatForADay = DidNotEatForADay(data, total);
      stats.earnALot = EarnALot(data);
      stats.earnALotAndAreHungry = EarnALotAndAreHungry(data);
      stats.experienceHunger = ExperienceHunger(data, total);
      stats.foodInsecurity = FoodInsecurity(data, total);
      stats.highGPA = HighGPA(data, total);
      stats.housingInsecurity = HousingInsecurity(data, total);
      stats.inhabitable = Inhabitable(data);
      stats.pellGrant = PellGrant(data);
      stats.skipMeals = SkipMeals(data);
      stats.sleptOutside = SleptOutside(data);
      stats.workALotAndAreHungry = WorkALotAndAreHungry(data);

      console.log("stats ", stats);

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
