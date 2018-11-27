const initialState = {
  id: "1.0.0",
  env: process.env.NODE_ENV,
  releaseDate: "2018-11-27"
};

console.log(initialState);

export default function versionReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return {
        ...state
      };
  }
}
