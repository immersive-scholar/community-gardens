import * as dat from "dat.gui";
import { Vector2, Vector3, Color } from "three-full";
import ColorSampler from "util/ColorSampler";
import PositionProps from "gui/PositionProps";

class BaseGUI {
  constructor(props) {
    this.gui = new dat.GUI().getRoot();
    this.instance = null;
    this.config = {};
    this.controls = props.controls;
  }

  addProperty(property) {
    this.config = {
      ...this.config,
      property
    };

    const folder = property.addFolder({
      gui: this.gui,
      onDataChange: () => this.onDataChange(),
      onDataChangeComplete: () => this.onDataChangeComplete()
    });
  }

  onDataChange() {
    this.controls.controls.enabled = false;
    try {
      for (let property in this.config) {
        this.config[property].update(this.instance);
      }
      // instance.setProps(config);
    } catch (error) {
      console.log("Instance required ", error);
    }
  }

  onDataChangeComplete() {
    this.controls.controls.enabled = true;
  }

  setInstance(i) {
    this.instance = i;
  }
}

export default BaseGUI;
