import * as dat from "dat.gui";

class BaseGUI {
  constructor(props) {
    this.gui = new dat.GUI().getRoot();
    this.instance = props.instance;
    this.properties = {};
    this.controls = props.controls;
  }

  addProperty(property) {
    this.properties[property.name] = property;

    property.addFolder({
      gui: this.gui,
      onDataChange: () => this.onDataChange(),
      onDataChangeComplete: () => this.onDataChangeComplete()
    });

    this.onDataChange();
    this.onDataChangeComplete();
  }

  onDataChange() {
    this.controls.controls.enabled = false;
    try {
      for (let property in this.properties) {
        this.properties[property].update(this.instance);
      }
    } catch (error) {
      console.log("Instance required ", error);
    }
  }

  onDataChangeComplete() {
    this.controls.controls.enabled = true;
  }

  setInstance(i) {}
}

export default BaseGUI;
