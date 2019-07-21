import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';

import Image from 'components/atoms/Image';

import { gallery, full, hs, item, wrapper } from './styles';

class Gallery extends PureComponent {
	renderPic = ({ pic, theme, index }) => {
		const lowResSource = [{ srcSet: pic.url[0].srcSet }];

		return (
			<div {...item} key={`pic_${index}`}>
				<Image ratio="1x1" sources={lowResSource} theme={theme} />
			</div>
		);
	};
	render() {
		const { pictures, theme } = this.props;

		return (
			<div {...gallery}>
				<div {...wrapper} {...hs} {...full}>
					{map(pictures, (pic, index) => this.renderPic({ pic, theme, index }))}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ theme }) => {
	return {
		theme,
	};
};

export default connect(mapStateToProps)(Gallery);
