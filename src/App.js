import React, { Component } from "react";
import { Vector3, Color } from "three-full";

import Simulation from "art/simulation/Simulation";
import Sun from "art/simulation/Sun";
import StarField from "art/simulation/StarField";
// import Shell from "art/simulation/Shell";
import Atmosphere from "art/simulation/Atmosphere";
import Planet from "art/simulation/Planet";

const planetColors = {
  terra: [
    new Color(0x008800), // dense grass
    new Color(0x009e00), // grass
    new Color(0xc2b26f), // sand
    new Color(0x309ec0), // ocean
    new Color(0x2988ae) // deep ocean
  ],
  mars: [
    new Color(0x99857a),
    new Color(0xc67b5c),
    new Color(0xe27b58),
    new Color(0xff9d6f),
    new Color(0x663926)
  ],
  luna: [
    new Color(0xdcdcdc),
    new Color(0xc9c9c9),
    new Color(0x8a7f8d),
    new Color(0x91a3b0),
    new Color(0xe5e5e5)
  ]
};

const baseRadius = 20;
const bumpScale = 0.5;
const getName = () => "Name";
const sun = new Sun(baseRadius * 2, 6);
const cameraRadius = 200;
const theta = Math.PI / 4;
const camera = {
  position: new Vector3(
    Math.cos(theta) * cameraRadius,
    118,
    Math.sin(theta) * cameraRadius
  )
};
const atmospheres = [];
const planets = [...new Array(5)].map((_, i, arr) => {
  const orbitRadius = baseRadius * (i * 4 + 8);
  const orbitDuration = i * (Math.random() * 40) + 60;
  const orbitOffset = Math.random() * Math.PI * 2;
  const rotationDuration = Math.random() * 5 + 16;
  const planetType = Object.keys(planetColors)[
    i % Object.keys(planetColors).length
  ];
  const colorPalette = planetColors[planetType];
  const seed = Math.random();
  const name = getName();
  if (planetType === "terra" || planetType === "mars") {
    const atmosphereColor = new Color(
      planetType === "terra" ? "#dae8f2" : "#c1440e"
    );
    const atmosphere = new Atmosphere(
      baseRadius * 1.2,
      orbitRadius,
      orbitDuration,
      rotationDuration,
      orbitOffset,
      atmosphereColor,
      camera
    );
    atmospheres.push(atmosphere);
  }
  return new Planet(
    seed,
    baseRadius,
    bumpScale,
    orbitRadius,
    orbitDuration,
    rotationDuration,
    orbitOffset,
    colorPalette,
    name
  );
});
const entities = [
  sun,
  ...planets,
  ...atmospheres,
  new StarField(128, 500, 0.5, 2, 0)
];

class App extends Component {
  render() {
    return (
      <Simulation
        fov={45}
        cameraPosition={camera.position}
        cameraElevation={baseRadius * 6}
        {...{ entities }}
      />
    );
  }
}

export default App;
