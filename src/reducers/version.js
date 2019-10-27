const initialState = {
	id: '1.1.7',
	env: process.env.NODE_ENV,
	releaseDate: '2019-10-27',
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
