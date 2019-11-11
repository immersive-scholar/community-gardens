import React from 'react';
import Loadable from 'react-loadable';

import { LoadablePage } from 'components/molecules/LoadableComponent';

const LoadableLiberactPresentation = Loadable({
	loader: () => import('../pages/Presentation/Liberact'),
	loading: LoadablePage,
	render(loaded, props) {
		const Component = loaded.default;
		return <Component {...props} />;
	},
});

export default LoadableLiberactPresentation;
