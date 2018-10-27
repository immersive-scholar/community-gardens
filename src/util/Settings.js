// https://medium.com/@hellomondaycom/how-we-built-the-google-cloud-infrastructure-webgl-experience-dec3ce7cd209
// https://medium.com/epicagency/airdrop-technical-casestudy-bafabf2f8c1e

import { getGPUTier } from "detect-gpu";

export default Settings => {
  const GPUTier = getGPUTier();
  console.log("GPUTier ", GPUTier);

  // let renderQuality = 1,
  //   antiAlias = true;

  // const settings = {
  //   dpr: Math.min(1.5, window.devicePixelRatio || 1),
  //   gyroscope: true,
  //   fxaa: true,
  //   shadow: true,
  //   shadowSize: 1024,
  // };

  // if (device.isMobile) {
  //   if (device.score <= 0) {
  //     settings.dpr = Math.min(1.5, settings.dpr);
  //   }

  //   if (device.score < 6) {
  //     settings.shadow = false;
  //   }

  //   if (device.score <= 10) {
  //     settings.dpr = Math.min(1.8, settings.dpr);
  //     settings.shadowSize = 512;
  //   }

  //   if (device.oldAdreno) {
  //     settings.dpr = Math.min(1, settings.dpr);
  //     settings.fxaa = false;
  //     settings.shadow = false;
  //     settings.gyroscope = false;
  //   }

  //   if (device.gpu.gpu === 'mali-450 mp') {
  //     settings.dpr = 1;
  //     settings.fxaa = false;
  //     settings.gyroscope = false;
  //   }

  //   //...
  // }
};
