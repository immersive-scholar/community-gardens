const initialState = {
  id: "1.0.7",
  env: process.env.NODE_ENV,
  releaseDate: "2018-12-15",
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
