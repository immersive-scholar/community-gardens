# Community Gardens

Community Gardens is a generative art experience about food and housing insecurity within the student body at NC State.

9.6% of students experienced housing insecurity within the past year. Community Garden's purpose is to raise awareness and challenge the stigmas and bias towards food and housing insecurities.

- **Data-Driven**: Plant attributes are driven by data collected by [Dr Mary Haskett](https://psychology.chass.ncsu.edu/faculty_staff/mehasket). Read the [report](https://dasa.ncsu.edu/wp-content/uploads/2018/03/NC-State-Food-and-Housing-Insecurity-1.pdf), and then see how [data affects the plants](https://communitygardens.generativeartist.com/data/)

- **Generative**: The gardens are unique every time the garden is created. No one will ever see the same garden twice.

- **Democratized**: The project runs on large, 20' displays as well as your laptop or your phone. Powered by javascript and WebGL, it runs just about anywhere you are.

## Installation

Community Gardens is developed to be easily installed.

First go to the [Community Gardens respository](https://github.com/lucastswick/community-gardens) and download the zip file. Unzip the file once it has downloaded.

Next you will need access to the command line. On osx, this is inside the Applications folder. Open the `terminal` application.

Now drag and drop the unzipped folder in to the terminal application. This will change directory to the downloaded files. To install the application dependencies, type:

```
npm i
```

If you receive an error, this means you do not have node or npm installed. Use [these instructions](https://nodejs.org/en/download/) to install node and npm.

It will take up to a few minutes for the installation process to complete. Once it has finished, type `npm start` from the command line to launch the application. It will open a browser window at localhost:3000 with the homepage.

## How the data is used

The data is very rich. Details collected range from numeric (age, number of years in school, degree obtained, how many hours a week they work) to behavioral (how the student pays for tuition, are they out of state, are they First Generation) to experiential (did they sleep outside, did they skip meals).

**Formula**
The first data to derive is the overall health factor of the plant. This is derived by the formula

_Resources Incoming - Energy Outgoing + Community Support - Emotional Health = Health_

For example, if a student has their tuition paid for, they have a high _Resources Incoming_ score. If a student is working 40 hours/week, they have a high _Energy Outgoing_ score. High _Community Support_ scorers are having some of their needs met by programs like the NC State Food Pantry or the Emergency Fund. Students who reported high levels of anxiety have low _Emotional Health_. Each of these categories is an aggregate of between 3 and 10 responses from the survey.

## Visual representation

Students are then collected by their overall health: Plants in the Summer Gardens have summer colors and are well-taken care of. Plants in the Winter Garden have cooler colors and are resource-starved.

Students who are **First Generation** have mazes drawn in their leaves, representing the additional level of challenge they have to navigate, often on their own.

Students who have higher **Incoming Resources** have thicker stems.

Students who have higher **Energy Outgoing** scores have berries displaced from their stems.

Students who have experienced **Housing Insecurity** are affected by the wind. Their leaves are displaced from the stem; the further the displacement the more severe the insecurity.

Students who experience **Food Insecurity** have berries drawn as wireframes. Their berries are hollow.

The **Degree** the student is pursing determines the plant height: taller plants are more senior degrees.

The **age** of the student determines the number of leaves or petals on the plant.

Students who indicate **High Anxiety** are drawn with angular lines. Smooth, elegant lines are used for other students

Students with a **High GPA** have stars drawn on their leaves.

Students who come from **Out of State** have leaves with topographical maps drawn on them.

## Aggregate data

As viewers learn how to 'read' the attributes of the plants, connections are made. For instance, the Garden of Housing Insecurity has many mazes on the leaves. This is because there is a disproportionate number of First Generation students who experience Housing Insecurity.

## Gardens

- [Summer Garden](https://communitygardens.generativeartist.com/garden/summer-garden/) represents plants who have high aggregate support.

- [Winter Garden](https://communitygardens.generativeartist.com/garden/winter-garden) represents students who have lower levels of support.

- [Random Garden](https://communitygardens.generativeartist.com/garden/random-garden/) is a random sampling of students.

- [Resourced](https://communitygardens.generativeartist.com/garden/resourced) represents students who have higher levels of Incoming Resources. Incoming Resource scores are high when a student has:

  - Scholarships
  - Grants
  - Work/study arrangement
  - Family/friends support, either monetarily or for housing
  - An employer who pays for tuition
  - High monthly incomes
  - Get 8 hours of sleep/night

- [Energy Outgoing](https://communitygardens.generativeartist.com/garden/energy-outgoing) represents students who have higher Energy Outgoing scores. Energy Outgoing is high when a student:

  - is working 30+ hours per week, especially if they are full-time students
  - has children
  - is pursuing their Masters or Doctoral degrees
  - stays in any sort of temporary housing, such as couch surfing, hotel/motel, outdoors, or in an inhabitable space
  - is searching for a job

- Community Support respresents students who are supported by their community. This includes making use of programs such as:

  - Foodbank
  - Campus mealplan
  - SSI
  - Medicaid
  - Section 8 housing
  - Vet benefits

Community Support also considers how _safe_ the student feels within their environment.

- Emotional Health represents the student's emotional health. This is derived by:

  - how calm the student feels
  - how active the student feels
  - how rested the student feels
  - how interested the student feels

- [Housing Insecurity](https://communitygardens.generativeartist.com/garden/housing-insecurity) represents students who have low housing security scores. They care so much about their education that they are willing to sleep outside or in inhabitable spaces.

- [First Generation](https://communitygardens.generativeartist.com/garden/first-generation) represents the amazing students who recently immigrated.

## Data Processing

The survey's data was exported from a spreadsheet to a [json file](https://github.com/lucastswick/community-gardens/blob/master/public/json/data.json). The file is zipped to preserve bandwidth.

Once the file is loaded and unzipped, the [Insecurity Calculator](https://github.com/lucastswick/community-gardens/blob/master/src/data/InsecurityCalculator.js) processes the data. It calculates:

- [Resources Incoming](https://github.com/lucastswick/community-gardens/blob/master/src/data/calculators/ResourcesIncoming.js)
- [Energy Outgoing](https://github.com/lucastswick/community-gardens/blob/master/src/data/calculators/EnergyOutgoing.js)
- [Community Fitness](https://github.com/lucastswick/community-gardens/blob/master/src/data/calculators/CommunityFitness.js)
- [Personal Scarcity](https://github.com/lucastswick/community-gardens/blob/master/src/data/calculators/PersonalScarcity.js)
- [Emotional Health](https://github.com/lucastswick/community-gardens/blob/master/src/data/calculators/EmotionalHealth.js)

Gardens can be created based around a certain statistic, and derived at any time. Available stastics are:

- [BelowPovertyLine](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/BelowPovertyLine.js)
- [CommunityGarden](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/CommunityGarden.js)
- [DidNotEatForADay](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/DidNotEatForADay.js)
- [EarnALot](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/EarnALot.js)
- [EarnALotAndAreHungry](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/EarnALotAndAreHungry.js)
- [EnergyOutgoing](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/EnergyOutgoing.js)
- [ExperienceHunger](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/ExperienceHunger.js)
- [FirstGeneration](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/FirstGeneration.js)
- [FoodInsecurity](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/FoodInsecurity.js)
- [HighGPA](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/HighGPA.js)
- [HighHealth](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/HighHealth.js)
- [HighResources](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/HighResources.js)
- [HousingInsecurity](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/HousingInsecurity.js)
- [Inhabitable](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/Inhabitable.js)
- [LowHealth](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/LowHealth.js)
- [OutOfState](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/OutOfState.js)
- [PellGrant](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/PellGrant.js)
- [SkipMeals](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/SkipMeals.js)
- [SleptOutside](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/SleptOutside.js)
- [Wellness](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/Wellness.js)
- [WorkALotAndAreHungry](https://github.com/lucastswick/community-gardens/blob/master/src/data/stats/WorkALotAndAreHungry.js)

Note that the InsecurityCalculator's data is stored staticly. There is no need to pass the `InsecurityCalculator` around as a prop. Simply use

```
let data = InsecurityCalculator.getRandomRows({
    count,
    key: ENERGY_OUTGOING
});
```

The returned data will be _count_ rows of students who meet the Energy Outgoing criteria defined in the `stat`.

## Gardens

Once the desired data is available, gardens are created. A garden is a model, a grouping of plants and a layout for the plants.

Each Garden is a chapter. Chapters can configure colors, backgrounds, plants, and layouts.

- [BaseChapter](https://github.com/lucastswick/community-gardens/tree/master/src/chapters/BaseChapter.js) _Not to be instantiated directly_
- [DidNotEatForADayChapter](https://github.com/lucastswick/community-gardens/tree/master/src/chapters/DidNotEatForADayChapter.js)
- [EnergyOutgoingChapter](https://github.com/lucastswick/community-gardens/tree/master/src/chapters/EnergyOutgoingChapter.js)
- [FirstGenerationChapter](https://github.com/lucastswick/community-gardens/tree/master/src/chapters/FirstGenerationChapter.js)
- [HighGPAChapter](https://github.com/lucastswick/community-gardens/tree/master/src/chapters/HighGPAChapter.js)
- [HousingInsecurityChapter](https://github.com/lucastswick/community-gardens/tree/master/src/chapters/HousingInsecurityChapter.js)
- [OutOfStateChapter](https://github.com/lucastswick/community-gardens/tree/master/src/chapters/OutOfStateChapter.js)
- [PellGrantChapter](https://github.com/lucastswick/community-gardens/tree/master/src/chapters/PellGrantChapter.js)
- [RandomGardenChapter](https://github.com/lucastswick/community-gardens/tree/master/src/chapters/RandomGardenChapter.js)
- [ResourcedChapter](https://github.com/lucastswick/community-gardens/tree/master/src/chapters/ResourcedChapter.js)
- [SummerGardenChapter](https://github.com/lucastswick/community-gardens/tree/master/src/chapters/SummerGardenChapter.js)
- [WellnessChapter](https://github.com/lucastswick/community-gardens/tree/master/src/chapters/WellnessChapter.js)
- [WinterGardenChapter](https://github.com/lucastswick/community-gardens/tree/master/src/chapters/WinterGardenChapter.js)

Models contain text and image data about the chapter. This is used in the list of gardens and the Chatper Plates. The available models are:

- [EnergyOutgoingModel](https://github.com/lucastswick/community-gardens/tree/master/src/models/EnergyOutgoingModel.js)
- [FirstGenerationModel](https://github.com/lucastswick/community-gardens/tree/master/src/models/FirstGenerationModel.js)
- [HighResourcesModel](https://github.com/lucastswick/community-gardens/tree/master/src/models/HighResourcesModel.js)
- [HousingInsecurityModel](https://github.com/lucastswick/community-gardens/tree/master/src/models/HousingInsecurityModel.js)
- [RandomGardenModel](https://github.com/lucastswick/community-gardens/tree/master/src/models/RandomGardenModel.js)
- [SummerGardenModel](https://github.com/lucastswick/community-gardens/tree/master/src/models/SummerGardenModel.js)
- [WinterGardenModel](https://github.com/lucastswick/community-gardens/tree/master/src/models/WinterGardenModel.js)

## Spawns

Each garden creates multiple Spawn instances. a Spawn is responsible for deriving plant properties based on the data, instantiating and managing (animateIn and removal of) the plant instances.

Available Spawn classes are:

- [Solomon's Seal Spawn](https://github.com/lucastswick/community-gardens/blob/master/src/art/solomons-seal/SolomonsSealSpawn.js)
- [Asimina Triloba Spawn](https://github.com/lucastswick/community-gardens/blob/master/src/art/asimina-triloba/AsiminaTrilobaSpawn.js)
- [Stellaria Pubera Spawn](https://github.com/lucastswick/community-gardens/blob/master/src/art/stellaria-pubera/StellariaPuberaSpawn.js)

## Modifiers

The connection of data-to-plant-properties happens in the `Transformers`. Each transformer accepts data input (calculated from the InsecurityCalculator) and outputs plant properties, as defined in attribute `modifiers`.

For instance, the age modifier accepts a student's age and then transforms the `props.petalCount` accordingly.

The available modifiers are:

- [AgeModifier](https://github.com/lucastswick/community-gardens/tree/master/src/transformers/modifiers/AgeModifier.js)
- [BelowPovertyLineModifier](https://github.com/lucastswick/community-gardens/tree/master/src/transformers/modifiers/BelowPovertyLineModifier.js)
- [CommunityFitnessModifier](https://github.com/lucastswick/community-gardens/tree/master/src/transformers/modifiers/CommunityFitnessModifier.js)
- [DegreeModifier](https://github.com/lucastswick/community-gardens/tree/master/src/transformers/modifiers/DegreeModifier.js)
- [EmotionalHealthModifier](https://github.com/lucastswick/community-gardens/tree/master/src/transformers/modifiers/EmotionalHealthModifier.js)
- [EnergyOutgoingModifier](https://github.com/lucastswick/community-gardens/tree/master/src/transformers/modifiers/EnergyOutgoingModifier.js)
- [FirstGenModifier](https://github.com/lucastswick/community-gardens/tree/master/src/transformers/modifiers/FirstGenModifier.js)
- [GPAModifier](https://github.com/lucastswick/community-gardens/tree/master/src/transformers/modifiers/GPAModifier.js)
- [HealthModifier](https://github.com/lucastswick/community-gardens/tree/master/src/transformers/modifiers/HealthModifier.js)
- [HousingInsecurityModifier](https://github.com/lucastswick/community-gardens/tree/master/src/transformers/modifiers/HousingInsecurityModifier.js)
- [InsecurityModifier](https://github.com/lucastswick/community-gardens/tree/master/src/transformers/modifiers/InsecurityModifier.js)
- [OutOfStateModifier](https://github.com/lucastswick/community-gardens/tree/master/src/transformers/modifiers/OutOfStateModifier.js)
- [PellGrantModifier](https://github.com/lucastswick/community-gardens/tree/master/src/transformers/modifiers/PellGrantModifier.js)
- [PersonalScarcityModifier](https://github.com/lucastswick/community-gardens/tree/master/src/transformers/modifiers/PersonalScarcityModifier.js)
- [ResourcesIncomingModifier](https://github.com/lucastswick/community-gardens/tree/master/src/transformers/modifiers/ResourcesIncomingModifier.js)
- [ShareModifier](https://github.com/lucastswick/community-gardens/tree/master/src/transformers/modifiers/ShareModifier.js)

## Plants

The plants are essentially data holders for the transformed properties when they are instantiated, but once the `createChildren` method is called, the geometry, materials, and mesh are created. This method of _deferred instantiation_ prevents dropped frames while creating multiple plants.

The geometries are created algorithmically in three parts:

1.  Stem
2.  Leaves or petals
3.  Berries or pollen

The algorithm creates different geometries and applies different materials based on the properties assigned to the plant.

### Plant Properties

Each plant property is settable and will trigger a redraw of the plant. The available properties are:

```
  setAnimated(animated)
  setDuration(duration)
  setDelay(delay)
  setRandomSeed(randomSeed)
  setWindForce(windForce)
  setWindDirection(windDirection)
  setHeight(height)
  setOffset(offset)
  setDisplacement(displacement)
  setThickness(thickness)
  setPointCount(pointCount)
  setPetalStartPoint(petalStartPoint)
  setPetalEndPoint(petalEndPoint)
  setRotationStart(rotationStart)
  setRotationEnd(rotationEnd)
  setSizeStart(sizeStart)
  setSizeEnd(sizeEnd)
  setColor(color)
  setHSLBase(hslBase)
  setHSLRange(hslRange)
  setBerryCount(berryCount)
  setBerrySize(berrySize)
  setBerryRotation(berryRotation)
  setBerryColor(berryColor)
  setBerryDistanceFromStem(berryDistanceFromStem)
  setBerrySpiral(berrySpiral)
  setOpenness(openness)
  setPetalCount(petalCount)
  setLeafCount(leafCount)
  setLeafStartPoint(leafStartPoint)
  setLeafEndPoint(leafEndPoint)
  setRearPetalCount(rearPetalCount)
  setPetalWidth(petalWidth)
  setPetalLength(petalLength)
  setPetalDistanceFromCenter(petalDistanceFromCenter)
  setRotationAxis(rotationAxis)
  setRotationAngle(rotationAngle)
  setTranslateToY(translateToY)
  setPetalRotation(petalRotation)
```

## BasePlant

[BasePlant](https://github.com/lucastswick/community-gardens/blob/master/src/art/common/BasePlant.js) is responsible for common plant tasks, like drawing the stem, handling setter methods for all the properties, cleaning the instance for garbage collection, the animateIn and animateOut methods.

## BaseRenderable

[BaseRenderable](https://github.com/lucastswick/community-gardens/blob/master/src/art/common/BaseRenderable.js) is resonsible for managing state in a react-like manner. Even if multiple properties change, the render method is only called once.

A plant has a focal point which tells the camera where exactly to look at it while focusing.

## Layouts

Plants can be arranged in a variety of layouts.

Layouts can be sized with a `bounds` object, which is a `Vector3` of width, height, and depth.

The available layouts are:

- [CircularLayout](https://github.com/lucastswick/community-gardens/tree/master/src/art/layouts/CircularLayout.js)
- [GridLayout](https://github.com/lucastswick/community-gardens/tree/master/src/art/layouts/GridLayout.js)
- [RandomLayout](https://github.com/lucastswick/community-gardens/tree/master/src/art/layouts/RandomLayout.js)

## Scene

Once the meshes have been created with the appropriate data and added to a scene, threejs handles rendering.

## Controls

Threejs supports moving and rotating any 3d object, including the camera. Assigning camera `position` props as part of a `TweenMax` tween, we can create fluid camera movement.

The specific process is to choose a random plant and obtain it's focal point. Tween the camera and the cameraTarget to that location. Once the camera arrives, choose another plant and repeat the process.

## Environments

The application behaves differently depending on the device it's running. There are two main breakpoints:

- Large Display: Used for Immersion Theatre, the Commons Wall, the Visualization Wall, and the Art Wall at Hunt Library. These devices have a `timeMultiplier` parameter set to 0.3, which slows the entire scene down to 30%. Certain displays also turn sidebars and 3D titles on to display additional content, and the camera is set to autopilot.

- Desktop and handheld: Used everywhere else. The number of plants created is reduced. The camera is set to user-controlled, and the sidebar is turned off.

Properties can be manually overriden via query string. The available query strings are:

- timeMultiplier: 1 is normal, <1 slows the installation down. Useful for large displays where movement is accelerated because the perceived distance is so much higher than on desktop or devices.

- quantityMultipler: The more powerful the GPU, more plants will be created. This ranges from 1 to 5. 10 will likely blow your computer up.

- seed: used to recreate a specific garden. Note that seeds are output to the console on instantiation: if you see something you need to recreate, simply note the output and append to the query string, ie ?seed=123

- DPR: Device pixel ratio can be lowered to increase framerate at the cost of decreasing resolution. Try 0.1 for mad pixelation.

- debug: set `?debug=1` to enable debug mode. This includes framerate stats, color palletes, and a gui for manipulating the camera.

## Bridging between react and three.js

Although threejs is all javascript, it's not immediately obvious how to render it inside a react compnent's render method, especially if you need to share data from redux. I followed [this direction](https://itnext.io/how-to-use-plain-three-js-in-your-react-apps-417a79d926e0), which worked quite well.

## Technologies

The project is all javascript and [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API), meaning it runs on 20' walls in the Hunt Library's [Immersion Theatre](https://www.lib.ncsu.edu/spaces/immersion-theater), on a desktop, or a mobile device.

- [threejs](https://threejs.org/) is for 3D rendering
- [three.bas](https://github.com/zadvorsky/three.bas), a buffer animation system, enables hundreds of individual geometries to be animated in an efficient manner
- [Meshline](https://github.com/spite/THREE.MeshLine) to draw lines in 3D space. Using brushstrokes as textures results in very pleasing aesthetic.
- [Random Seed](https://www.npmjs.com/package/random-seed) to recreate random sequences across installations
- [react](https://reactjs.org/) for the UI
- [dat.gui](https://github.com/dataarts/dat.gui) for rapid testing of variables
- [detect-gpu](https://www.npmjs.com/package/detect-gpu) to throttle features per device
- [glamorous](https://glamorous.rocks/) for styling the UI
- [gsap](https://greensock.com/gsap) for tweening
- [lodash](https://lodash.com/) for data-parsing utilities
- [react helmet](https://www.npmjs.com/package/react-helmet) for SEO support within a SPA
- [react redux](https://github.com/reduxjs/react-redux) for bindings
- [JSZip](https://stuk.github.io/jszip/) for uncompressing zip files in the browser.
- [typography](https://kyleamathews.github.io/typography.js/) for ... typography.

## Credits

Created by [lucastswick](https://generativeartist.com) during a six-week artist residency funded by the [Andrew Mellon Foundation](https://mellon.org/) through the [Immersive Scholar](https://www.immersivescholar.org/) program with [NCSU](https://www.ncsu.edu/).

### Core Team

- [Jasmine Lang](https://jlangdesign.github.io/about.html), Branding and UI/UX
- [Erica Hayes](https://www.lib.ncsu.edu/staff/eyhayes)
- [Shelby Hallman](https://www.lib.ncsu.edu/staff/sjhallma)
- [Markus Wust](https://www.lib.ncsu.edu/staff/mgwust)

### Could not have done it without

- [Dr Mary Haskett](https://faculty.chass.ncsu.edu/mehasket)
- [Karen Ciccone](https://www.lib.ncsu.edu/staff/kacollin)
- [Sarah Wright](https://trio.dasa.ncsu.edu/student-support-services/about/our-staff/)
- [Micah Vandegrift](https://www.lib.ncsu.edu/staff/mlvandeg)

### Special thanks to

- [Molly Renda](https://www.lib.ncsu.edu/staff/mrenda) for creating the print exhibition
- [Walt Gurley](https://www.lib.ncsu.edu/staff/jwgurley) for the encouragement and assistance with hardware testing
- [Marian Fragola](https://www.lib.ncsu.edu/staff/mgfragol) for making the presentations an enormous success
