import { getGPUTier } from "detect-gpu";

export default Settings => {
  const GPUTier = getGPUTier();
  console.log("GPUTier ", GPUTier);

  const renderQuality = 1,
    antiAlias = true;
};
