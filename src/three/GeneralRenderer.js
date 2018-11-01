import { WebGLRenderer } from "three-full";

export default ({ canvas, width, height }) => {
  const renderer = new WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: !true,
    logarithmicDepthBuffer: false,
    preserveDrawingBuffer: true
  });
  const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
  renderer.setPixelRatio(DPR);
  renderer.setSize(width, height);
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.shadowMap.enabled = true;
  // renderer.autoClear = false;

  return renderer;
};

/*
import { getGPUTier } from "detect-gpu";

export default ({ canvas, width, height }) => {
    this.GPUTier = getGPUTier();
    console.log('GPU Tier ', this.GPUTier);
    
    const overrideQualityLevel: number = -1;
const currRenderQuality = 1;
const isAntialiasing = true;

    const renderer = new GeneralRenderer({canvas, width, height}) 

    function replaceRenderer(antiAlias = true) {
  if (this.currRenderQuality !== this.overrideQualityLevel && antiAlias !== this.isAntialiasing) {
     console.log('%cSETTING UP NEW RENDERER', 'color: red');
    
     this.currRenderQuality = this.overrideQualityLevel;
     this.isAntialiasing = antiAlias;
     let oldCanvas = this.renderer.domElement;
      
     this.renderer.dispose();
    
     this.renderer = new  GeneralRenderer({canvas, width, height, antiAlias: antiAlias, powerPreference: 'high-performance'}) {
        antialias: antiAlias,
        powerPreference: 'high-performance'
     });

     this.canvasContainer.removeChild(oldCanvas);
     this.canvasContainer.appendChild(this.renderer.domElement);

     this.preCompile();
  }
}

function setQualityLevel(level:number) {
  this.overrideQualityLevel = level;
  let pixelRatio = 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const devicePixelRatio = window.devicePixelRatio;

  if (devicePixelRatio > 1.15 && width > 1025) {
     if (width <= 1680) {
        pixelRatio = Math.min(devicePixelRatio, 1.15);
     } else {
        pixelRatio = 1;
     }
  } else {
     if (IS_HIGH_PERFORMANCE_IOS_DEVICE) {
        pixelRatio = Math.min(window.devicePixelRatio, 2.5);
     } else {
        pixelRatio = Math.min(window.devicePixelRatio, 1.25);
     }
  }

  if (this.overrideQualityLevel === 0) {
     pixelRatio = 1;
     this.replaceRenderer(false);
  } else if (this.overrideQualityLevel === 1) {
     // Use default logic for pixel ratio:
     this.replaceRenderer(true);
  } else if (this.overrideQualityLevel === 2) {
     this.replaceRenderer(true);
     pixelRatio = Math.min(window.devicePixelRatio, 2.5);
  }
  
  this.renderer.setPixelRatio(pixelRatio);
 
  this.renderer.setSize(WindowManager.width, WindowManager.height);
}

return {
    renderer: this.renderer,
    setQualityLevel
}

};

*/
