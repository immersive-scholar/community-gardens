import sample from "lodash/sample";

const ColorSampler = () => {
  const samples = [0xf74633, 0xca7e5e, 0x821b24, 0xe87e83];

  function getRandomColor() {
    return sample(samples);
  }

  return {
    samples,
    getRandomColor
  };
};

export default ColorSampler;
