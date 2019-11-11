import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { slides } from 'actions';
import { getSelectedSlide } from 'reducers';

import SlideController from 'components/molecules/SlideController';
import { css } from 'glamor';

class LiberactPresentation extends PureComponent {
	componentWillMount() {
		// const headerImage = PathToPicture("headers", `community-gardens-data`);

		const theme = {
			bright: '#fbb3d1',
			pink: '#ec468a',
			dark: '#574f65',
			colors: ['#fbb3d1', '#ffffff', '#c25482'],
		};

		this.setState({
			theme,
		});
	}

	render() {
		const { selectedSlide } = this.props;
		const { theme } = this.state;
		const SlideClass = selectedSlide.slideClass;

		return (
			<div {...css({ background: '#000' })}>
				<Helmet
					title="Community Gardens Presentation for Liberact"
					description="Presentation materials for Liberact at NCSU Hunt Library."
				/>
				<SlideController />
				<SlideClass theme={theme} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { slides } = state;
	return {
		selectedSlideID: slides.selectedID,
		selectedSlide: getSelectedSlide(state),
	};
};

const mapDispatchToProps = dispatch => ({
	focusSlide: bindActionCreators(slides.focusSlide, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LiberactPresentation);
