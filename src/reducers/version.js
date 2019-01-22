const initialState = {
  id: "1.0.9",
  env: process.env.NODE_ENV,
  releaseDate: "2019-01-21",
};

console.log(initialState);

export default function versionReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return {
        ...state,
      };
  }
}
