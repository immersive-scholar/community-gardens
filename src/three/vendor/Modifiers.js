const Modifiers = {
  ModifierStack(mesh) {
    return new window.ModifierStack(mesh);
  },
  ModConstant() {
    return window.ModConstant;
  },
  Bend(x, y, z) {
    return new window.Bend(x, y, z);
  }
};

export default Modifiers;
