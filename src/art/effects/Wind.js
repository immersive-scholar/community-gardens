import { Vector3, Mesh } from "three-full";

import Modifiers from "three/vendor/Modifiers";

function Wind({
  geometry,
  windForce = 0.1,
  windDirection = new Vector3(2, 2, 0)
}) {
  // bend
  if (windForce) {
    let temporaryMesh = new Mesh(geometry.clone(), null);
    const modifier = Modifiers.ModifierStack(temporaryMesh);
    const bend = Modifiers.Bend(
      windDirection.x,
      windDirection.y,
      windDirection.z
    );
    bend.force = windForce;
    bend.constraint = Modifiers.ModConstant().NONE;
    modifier.addModifier(bend);
    modifier.apply();

    geometry.vertices = temporaryMesh.geometry.vertices;

    temporaryMesh = undefined;
  }

  return geometry;
}

export default Wind;
