const initialState = {
  id: "1.1.2",
  env: process.env.NODE_ENV,
  releaseDate: "2019-04-01",
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
