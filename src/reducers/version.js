const initialState = {
  id: "0.8.2",
  env: process.env.NODE_ENV,
  releaseDate: "2018-11-15"
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
