import { combineReducers } from "redux";

import settings from "reducers/settings";

const appReducer = combineReducers({
  settings
});

const rootReducer = (state, action) => {
  let newState = state;
  return appReducer(newState, action);
};

export default rootReducer;

/*
export const getSelectedColorFamily = state =>
  fromColorFamilies.getSelection(state.colorFamilies);

export const getSelectedFile = state => fromFiles.getSelection(state.files);

export const getSelectedSample = state =>
  fromSamples.getSelection(state.samples);

export const getSamplesOfSelectedFile = state => {
  const selectedFileId = state.files.selectedId;
  const samples = state.samples.node;
  const samplesOfSelectedFile = filter(
    samples,
    sample => sample.fileId === selectedFileId
  );
  return samplesOfSelectedFile;
};
export const getSamplesByColorFamily = state =>
  fromSamples.getSamplesByColorFamily(state.samples);

export const exportSamples = state => {
  console.log("Exporting... ", state);
};
*/
