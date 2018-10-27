import BaseGUI from "gui/BaseGUI";
import AnimatedProps from "gui/props/AnimatedProps";
import RandomSeedProps from "gui/props/RandomSeedProps";
import PositionProps from "gui/props/PositionProps";
import StemProps from "gui/props/StemProps";
import LeafProps from "gui/props/LeafProps";
import LeafColorProps from "gui/props/LeafColorProps";
import BerryProps from "gui/props/BerryProps";
import WindProps from "gui/props/WindProps";

class SolomonsSealController extends BaseGUI {
  constructor(props) {
    super(props);

    const animatedProps = new AnimatedProps();
    super.addProperty(animatedProps);

    const randomSeedProps = new RandomSeedProps();
    super.addProperty(randomSeedProps);

    const positionProps = new PositionProps();
    super.addProperty(positionProps);

    const stemProps = new StemProps();
    super.addProperty(stemProps);

    const leafProps = new LeafProps();
    super.addProperty(leafProps);

    const leafColorProps = new LeafColorProps();
    super.addProperty(leafColorProps);

    const windProps = new WindProps();
    super.addProperty(windProps);

    const berryProps = new BerryProps();
    super.addProperty(berryProps);
  }
}

export default SolomonsSealController;
