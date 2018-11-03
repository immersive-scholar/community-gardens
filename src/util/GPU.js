// https://medium.com/@hellomondaycom/how-we-built-the-google-cloud-infrastructure-webgl-experience-dec3ce7cd209
// https://medium.com/epicagency/airdrop-technical-casestudy-bafabf2f8c1e

import { getGPUTier } from "detect-gpu";
import Device from "./Device";

const GPU = () => {
  const tier = getGPUTier();
  const tierIndex = parseInt(tier.tier.substr(-1), 10) || 1;
  const device = new Device();

  const config = {
    dpr: Math.min(1.5, window.devicePixelRatio || 1),
    antiAlias: true
  };

  if (tierIndex <= 2) {
    // config.dpr = Math.min(1, config.dpr);
  }

  if (tierIndex <= 1) {
    config.shadow = false;
    config.antiAlias = false;
  }

  if (tierIndex === 0) {
    config.dpr = Math.min(1, config.dpr);
  }

  if (device.mobile) {
    config.dpr = Math.min(1, config.dpr);
  }

  return {
    tier,
    tierIndex,
    device,
    config
  };
};

export default GPU;
