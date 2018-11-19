import React, { PureComponent } from "react";
import Helmet from "react-helmet";
import { css } from "glamor";

import TextLink from "components/atoms/TextLink";
import Image from "components/atoms/Image";
import Animated from "components/molecules/Animated";
import PathToPicture from "util/PathToPicture";
import Newsletter from "components/organisms/Newsletter";
import Footer from "components/organisms/Footer";

import { textContainer, bulletless, removeMarginLeft } from "styles";

class TechnicalDetails extends PureComponent {
  componentWillMount() {
    const headerImage = PathToPicture("headers", `out-of-state`);
    this.setState({ headerImage });
  }

  render() {
    const { headerImage } = this.state;

    const theme = {
      baseColor: "#fbb3d1",
      colors: ["#ec468a", "#fbb3d1", "#ffffff", "#c25482"]
    };

    return (
      <div>
        <Image ratio="16x9" sources={headerImage} />
        <div {...textContainer}>
          <Helmet
            title="Community Gardens Credits"
            description="The team behind Community Gardens."
          />

          <Animated as="h2">
            Curious about how Community Gardens was built?
          </Animated>
          <Animated as="p">
            Community Gardens is a data-driven generative art installation that
            runs inside a browser. Built using javascript and threejs, it
            generates plants. Each plant represents a student that we have food
            and housing insecurity information about.
          </Animated>

          <Animated as="h2">Data Processing</Animated>
          <Animated as="p">
            Dr Mary Haskett conducted a survey last year that collects
            information from students. Some students are well-resourced and
            others face insecurities. The survey clarified exactly how much
            insecurity students face, and we learned that 9.6% of students
            experienced homeless over the past year.
          </Animated>
          <Animated as="p">
            My job starts with the data. The survey results are exported from a
            spreadsheet to a{" "}
            <a href="https://github.com/lucastswick/community-gardens/blob/master/public/json/data.json">
              json file
            </a>. The file is zipped to preserve bandwidth. It was an 8 meg json
            file, but I got it down to 145k by removing irrelevant values and
            zipping the file.
          </Animated>

          <Animated as="p">
            Once the file is loaded and unzipped, the{" "}
            <a href="https://github.com/lucastswick/community-gardens/blob/master/src/data/InsecurityCalculator.js">
              Insecurity Calculator
            </a>{" "}
            processes the data. It calculates:
          </Animated>

          <Animated as="ul">
            <li>Resources Incoming</li>
            <li>Energy Outgoing</li>
            <li>Community Fitness</li>
            <li>Personal Scarcity</li>
            <li>Emotional Health</li>
          </Animated>

          <Animated as="p">
            These values drive a{" "}
            <TextLink to="/data" label="bunch of plant characteristics" />, but
            we're not done with the data yet. We need to aggregate the data in
            meaningful ways.
          </Animated>

          <Animated as="p">
            Gardens can be created based around a certain statistic, and derived
            at any time. Available stastics are:
          </Animated>

          <Animated as="ul">
            <li>BelowPovertyLine</li>
            <li>CommunityGarden</li>
            <li>DidNotEatForADay</li>
            <li>EarnALot</li>
            <li>EarnALotAndAreHungry</li>
            <li>EnergyOutgoing</li>
            <li>ExperienceHunger</li>
            <li>FirstGeneration</li>
            <li>FoodInsecurity</li>
            <li>HighGPA</li>
            <li>HighHealth</li>
            <li>HighResources</li>
            <li>HousingInsecurity</li>
            <li>Inhabitable</li>
            <li>LowHealth</li>
            <li>OutOfState</li>
            <li>PellGrant</li>
            <li>SkipMeals</li>
            <li>SleptOutside</li>
            <li>Wellness</li>
            <li>WorkALotAndAreHungry</li>
          </Animated>

          <Animated as="h2">Gardens</Animated>

          <Animated as="p">
            Once the aggregate data is available, gardens are created. A garden
            consists of a data model, a grouping of plants and a layout for the
            plants. Gardens can also be configured with colors and backgrounds.
          </Animated>

          <Animated as="p">The available chapters are:</Animated>

          <Animated as="ul">
            <li>DidNotEatForADayChapter</li>
            <li>EnergyOutgoingChapter</li>
            <li>FirstGenerationChapter</li>
            <li>HighGPAChapter</li>
            <li>HousingInsecurityChapter</li>
            <li>OutOfStateChapter</li>
            <li>PellGrantChapter</li>
            <li>RandomGardenChapter</li>
            <li>ResourcedChapter</li>
            <li>SummerGardenChapter</li>
            <li>WellnessChapter</li>
            <li>WinterGardenChapter</li>
          </Animated>

          <Animated as="h2">Spawns</Animated>

          <Animated as="p">
            Each garden creates multiple Spawn instances. a Spawn is responsible
            for deriving plant properties based on the data, instantiating and
            managing (animateIn and removal of) the plant instances.
          </Animated>

          <Animated as="p">Available Spawn classes are:</Animated>

          <Animated as="ul">
            <li>Solomon's Seal Spawn</li>
            <li>Asimina Triloba Spawn</li>
            <li>Stellaria Pubera Spawn</li>
          </Animated>

          <Animated as="h2">Modifiers</Animated>

          <Animated as="p">
            The connection of data-to-plant-properties happens in the{" "}
            <code>Transformers</code>. Each transformer accepts data input
            (calculated from the InsecurityCalculator) and outputs plant
            properties, as defined in attribute <code>modifiers</code>.
          </Animated>

          <Animated as="p">
            For instance, the age modifier accepts a student's age and then
            transforms the <code>props.petalCount</code> accordingly.
          </Animated>

          <Animated as="p">The available modifiers are:</Animated>

          <Animated as="ul">
            <li>AgeModifier</li>
            <li>BelowPovertyLineModifier</li>
            <li>CommunityFitnessModifier</li>
            <li>DegreeModifier</li>
            <li>EmotionalHealthModifier</li>
            <li>EnergyOutgoingModifier</li>
            <li>FirstGenModifier</li>
            <li>GPAModifier</li>
            <li>HealthModifier</li>
            <li>HousingInsecurityModifier</li>
            <li>InsecurityModifier</li>
            <li>OutOfStateModifier</li>
            <li>PellGrantModifier</li>
            <li>PersonalScarcityModifier</li>
            <li>ResourcesIncomingModifier</li>
            <li>ShareModifier</li>
          </Animated>

          <Animated as="h2">Plants</Animated>

          <Animated as="p">
            The plants are essentially data holders for the transformed
            properties when they are instantiated, but once the{" "}
            <code>createChildren</code> method is called, the geometry,
            materials, and mesh are created and added to the scene. This method
            of <em>deferred instantiation</em> prevents dropped frames while
            creating multiple plants.
          </Animated>

          <Animated as="p">
            The geometries are created algorithmically in three parts:
          </Animated>

          <ol>
            <Animated as="li">Stem</Animated>
            <Animated as="li">Leaves or petals</Animated>
            <Animated as="li">Berries or pollen</Animated>
          </ol>

          <Animated as="p">
            The algorithm creates geometries and applies different materials
            based on the properties assigned to the plant.
          </Animated>

          <Animated as="h2">Plant Properties</Animated>

          <Animated as="p">
            Each plant property is settable and will trigger a redraw of the
            plant. The available properties are:
          </Animated>

          <pre>
            <code {...css({ whiteSpace: "pre-wrap" })}>
              setAnimated(animated)<br />
              setDuration(duration)<br />
              setDelay(delay)<br />
              setRandomSeed(randomSeed) setWindForce(windForce)<br />
              setWindDirection(windDirection)<br />
              setHeight(height)<br />
              setOffset(offset)<br />
              setDisplacement(displacement)<br />
              setThickness(thickness)<br />
              setPointCount(pointCount)<br />
              setPetalStartPoint(petalStartPoint)<br />
              setPetalEndPoint(petalEndPoint)<br />
              setRotationStart(rotationStart)<br />
              setRotationEnd(rotationEnd)<br />
              setSizeStart(sizeStart)<br />
              setSizeEnd(sizeEnd)<br />
              setColor(color)<br />
              setHSLBase(hslBase)<br />
              setHSLRange(hslRange)<br />
              setBerryCount(berryCount)<br />
              setBerrySize(berrySize)<br />
              setBerryRotation(berryRotation)<br />
              setBerryColor(berryColor)<br />
              setBerryDistanceFromStem(berryDistanceFromStem)<br />
              setBerrySpiral(berrySpiral)<br />
              setOpenness(openness)<br />
              setPetalCount(petalCount)<br />
              setLeafCount(leafCount)<br />
              setLeafStartPoint(leafStartPoint)<br />
              setLeafEndPoint(leafEndPoint)<br />
              setRearPetalCount(rearPetalCount)<br />
              setPetalWidth(petalWidth)<br />
              setPetalLength(petalLength)<br />
              setPetalDistanceFromCenter(petalDistanceFromCenter)<br />
              setRotationAxis(rotationAxis)<br />
              setRotationAngle(rotationAngle)<br />
              setTranslateToY(translateToY)<br />
              setPetalRotation(petalRotation)<br />
            </code>
          </pre>

          <Animated as="h2">BasePlant</Animated>

          <Animated as="p">
            BasePlant is responsible for common plant tasks, like drawing the
            stem, handling setter methods for all the properties, cleaning the
            instance for garbage collection, the animateIn and animateOut
            methods.
          </Animated>

          <Animated as="h2">BaseRenderable</Animated>

          <Animated as="p">
            BaseRenderable is resonsible for managing state in a react-like
            manner. Even if multiple properties change, the render method is
            only called once.
          </Animated>

          <Animated as="p">
            A plant has a focal point which tells the camera where exactly to
            look at it while focusing.
          </Animated>

          <Animated as="h2">Layouts</Animated>

          <Animated as="p">
            Plants can be arranged in a variety of layouts.
          </Animated>

          <Animated as="p">
            Layouts can be sized with a <code>bounds</code> object, which is a{" "}
            <code>Vector3</code> of width, height, and depth.
          </Animated>

          <Animated as="p">The available layouts are:</Animated>

          <Animated as="ul">
            <li>CircularLayout</li>
            <li>GridLayout</li>
            <li>RandomLayout</li>
          </Animated>

          <Animated as="h2">Scene</Animated>

          <Animated as="p">
            Once the meshes have been created with the appropriate data and
            added to a scene, threejs handles rendering.
          </Animated>

          <Animated as="h2">Controls</Animated>

          <Animated as="p">
            Threejs supports moving and rotating any 3d object, including the
            camera. Assigning camera <code>position</code> props as part of a{" "}
            <code>TweenMax</code> tween, we can create fluid camera movement.
          </Animated>

          <Animated as="p">
            The specific process is to choose a random plant and obtain its
            focal point. Tween the camera and the cameraTarget to that location.
            Once the camera completes its tween, another plant is chosen and the
            process is repeated.
          </Animated>

          <Animated as="h2">Environments</Animated>

          <Animated as="p">
            The application behaves differently depending on the device it's
            running. There are two main breakpoints:
          </Animated>

          <ul>
            <Animated as="li">
              Large Display: Used for Immersion Theatre, the Commons Wall, the
              Visualization Wall, and the Art Wall at Hunt Library. These
              devices have a <code>timeMultiplier</code> parameter set to 0.3,
              which slows the entire scene down to 30%. Certain displays also
              turn sidebars and 3D titles on to display additional content, and
              the camera is set to autopilot.
            </Animated>

            <Animated as="li">
              Desktop and handheld: Used everywhere else. The number of plants
              created is reduced. The camera is set to user-controlled, and the
              sidebar is turned off.
            </Animated>
          </ul>

          <Animated as="p">
            Properties can be manually overriden via query string. The available
            query strings are:
          </Animated>

          <ul>
            <Animated as="li">
              timeMultiplier: 1 is normal, &lt;1 slows the installation down.
              Useful for large displays where movement is accelerated because
              the perceived distance is so much higher than on desktop or
              devices.
            </Animated>

            <Animated as="li">
              quantityMultipler: The more powerful the GPU, more plants will be
              created. This ranges from 1 to 5. 10 will likely blow your
              computer up.
            </Animated>

            <Animated as="li">
              seed: used to recreate a specific garden. Note that seeds are
              output to the console on instantiation: if you see something you
              need to recreate, simply note the output and append to the query
              string, ie ?seed=123
            </Animated>

            <Animated as="li">
              DPR: Device pixel ratio can be lowered to increase framerate at
              the cost of decreasing resolution. Try <code>?dpr=0.1</code> for
              mad pixelation.
            </Animated>

            <Animated as="li">
              debug: set <code>?debug=1</code> to enable debug mode. This
              includes framerate stats, color palletes, and a gui for
              manipulating the camera.
            </Animated>
          </ul>

          <Animated as="h2">Bridging react with three.js</Animated>

          <Animated as="p">
            Although threejs is all javascript, it's not immediately obvious how
            to render it inside a react compnent's render method, especially if
            you need to share data from redux. I followed{" "}
            <a href="https://itnext.io/how-to-use-plain-three-js-in-your-react-apps-417a79d926e0">
              this direction
            </a>, which worked quite well.
          </Animated>

          <Animated as="h2">
            Technologies that made Community Gardens possible
          </Animated>

          <Animated>
            The project is all javascript and{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API">
              WebGL
            </a>, meaning it runs on 20' walls in the Hunt Library's{" "}
            <a href="https://www.lib.ncsu.edu/spaces/immersion-theater">
              Immersion Theatre
            </a>, on a desktop, or a mobile device (although with fewer plants
            on smaller devices to make sure phones don't blow up).
          </Animated>

          <ul>
            <li>
              <TextLink href="https://threejs.org/" label="threejs" /> is for 3D
              rendering
            </li>

            <li>
              <TextLink
                href="https://github.com/zadvorsky/three.bas"
                label="three.bas"
              />, a buffer animation system, enables hundreds of individual
              geometries to be animated in an efficient manner
            </li>

            <li>
              <TextLink
                href="https://github.com/spite/THREE.MeshLine"
                label="Meshline"
              />{" "}
              to draw lines in 3D space. Using brushstrokes as textures results
              in very pleasing aesthetic.
            </li>

            <li>
              <TextLink
                href="https://www.npmjs.com/package/random-seed"
                label="Random Seed"
              />{" "}
              to recreate random sequences across installations
            </li>

            <li>
              <TextLink href="https://reactjs.org/" label="react" /> for the UI
            </li>

            <li>
              <TextLink
                href="https://github.com/dataarts/dat.gui"
                label="dat.gui"
              />{" "}
              for rapid testing of variables
            </li>

            <li>
              <TextLink
                href="https://www.npmjs.com/package/detect-gpu"
                label="detect-gpu"
              />{" "}
              to throttle features per device
            </li>

            <li>
              <TextLink href="https://glamorous.rocks/" label="glamorous" /> for
              styling the UI
            </li>

            <li>
              <TextLink href="https://greensock.com/gsap" label="gsap" /> for
              tweening
            </li>

            <li>
              <TextLink href="https://lodash.com/" label="lodash" /> for
              data-parsing utilities
            </li>

            <li>
              <TextLink
                href="https://www.npmjs.com/package/react-helmet"
                label="react helmet"
              />{" "}
              for SEO support within a SPA
            </li>

            <li>
              <TextLink
                href="https://github.com/reduxjs/react-redux"
                label="react redux"
              />{" "}
              for bindings
            </li>

            <li>
              <TextLink href="https://stuk.github.io/jszip/" label="JSZip" />{" "}
              for uncompressing zip files in the browser.
            </li>

            <li>
              <TextLink
                href="https://kyleamathews.github.io/typography.js/"
                label="typography"
              />{" "}
              for ... typography.
            </li>
          </ul>
        </div>

        <Newsletter />
        <Footer />
      </div>
    );
  }
}

export default TechnicalDetails;
