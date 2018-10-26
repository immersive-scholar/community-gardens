import ResourcesIncomingCalculator from "./calculators/ResourcesIncoming";
import EnergyOutgoingCalculator from "./calculators/EnergyOutgoing";
import CommunityFitnessCalculator from "./calculators/CommunityFitness";
import PersonalScarcityCalculator from "./calculators/PersonalScarcity";
import EmotionalHealthCalculator from "./calculators/EmotionalHealth";
import HealthCalculator from "./calculators/Health";

import SleptOutside from "./stats/SleptOutside";
import Inhabitable from "./stats/Inhabitable";
import HousingInsecurity from "./stats/HousingInsecurity";
import PellGrant from "./stats/PellGrant";

class InsecurityCalculator {
  static async parse(data) {
    return new Promise(resolve => {
      let max = 0,
        min = 0,
        minData,
        maxData,
        total = 0;
      for (var i in data) {
        data[i].resourcesIncoming = ResourcesIncomingCalculator(data[i]);
        data[i].energyOutgoing = EnergyOutgoingCalculator(data[i]);
        data[i].communityFitness = CommunityFitnessCalculator(data[i]);
        data[i].personalScarcity = PersonalScarcityCalculator(data[i]);
        data[i].emotionalHealth = EmotionalHealthCalculator(data[i]);
        data[i].health = HealthCalculator(data[i]);

        if (data[i].health < min) {
          minData = data[i];
          min = data[i].health;
        }

        if (data[i].health > max) {
          maxData = data[i];
          max = data[i].health;
        }
        total++;
      }
      // console.log("min ", min, minData);
      // console.log("max ", max, maxData);

      const stats = {};
      stats.sleptOutside = SleptOutside(data);
      stats.inhabitable = Inhabitable(data);
      stats.housingInsecurity = HousingInsecurity(data, total);
      stats.pellGrant = PellGrant(data);

      const pellGrant = InsecurityCalculator.count(
        data,
        ["Pell"],
        InsecurityCalculator.COMPARE_NUMERIC_TO_1
      );
      stats.pellGrant = {
        label: `There are ${pellGrant} students who received a Pell Grant.`,
        count: pellGrant
      };

      console.log("stats ", stats);

      data.stats = stats;
      resolve(data);
    });
  }

  static count(data, labels, condition) {
    let c = 0,
      label;
    for (var l in labels) {
      label = labels[l];
      for (var i in data) {
        switch (condition) {
          // InsecurityCalculator.COMPARE_NUMERIC_TO_1:
          case 1:
            c += parseInt(data[i][label], 10) === 1 ? 1 : 0;
            break;
          // InsecurityCalculator.COMPARE_NUMERIC_TO_6:
          case 2:
            c += parseInt(data[i][label], 10) == 6 ? 1 : 0;
            break;
          default:
            break;
        }
      }
    }
    return c;
  }

  // RULES
  static COMPARE_NUMERIC_TO_1 = 1;
  static COMPARE_NUMERIC_TO_6 = 2;
}

export default InsecurityCalculator;
