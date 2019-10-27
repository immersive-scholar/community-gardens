import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { exit } from 'react-icons-kit/icomoon/exit';
import { question } from 'react-icons-kit/icomoon/question';

import { settings } from 'actions';
import { getSelectedChapter } from 'reducers';
import OptionsButton from './OptionsButton';
import Options from './Options';

import { removePaddingVertical, lightText, shadowless, button } from 'styles';
import { ControlBarDiv, controlsGrid, stateOpen, container } from './styles';

class ThreeControlBar extends PureComponent {
	onPlaybackChange = p => {
		this.props.setPlaying(p);
	};

	toggleOptions = () => {
		const { optionsOpen } = this.props;
		this.props.setOptionsOpen(!optionsOpen);
	};

	toggleAboutModal = () => {
		const { aboutModalOpen } = this.props;
		this.props.setAboutModalOpen(!aboutModalOpen);
	};

	render() {
		const { playing, optionsOpen } = this.props;
		const title = get(this.props, 'selectedChapter.title', 'Loading...');
		const controlBarClass = optionsOpen ? stateOpen : {};

		return (
			<ControlBarDiv {...controlBarClass}>
				<div
					{...container}
					{...removePaddingVertical}
					{...lightText}
					{...controlsGrid}
				>
					{/* <PlaybackControls
            isPlaying={playing}
            onPlaybackChange={p => this.onPlaybackChange(p)}
          /> */}

					<OptionsButton
						optionsOpen={optionsOpen}
						toggleOptions={() => this.toggleOptions()}
						isPlaying={playing}
						onPlaybackChange={p => this.onPlaybackChange(p)}
					/>

					{title}

					<a {...shadowless} {...lightText} {...button}>
						<Icon
							size={24}
							icon={question}
							onClick={() => this.toggleAboutModal()}
						/>
					</a>

					<Link {...shadowless} {...lightText} to="/">
						<Icon size={24} icon={exit} />
					</Link>
				</div>
				<Options
					isPlaying={playing}
					onPlaybackChange={p => this.onPlaybackChange(p)}
				/>
			</ControlBarDiv>
		);
	}
}

const mapStateToProps = state => {
	const { settings, chapters } = state;
	return {
		playing: settings.playing,
		optionsOpen: settings.optionsOpen,
		aboutModalOpen: settings.aboutModalOpen,
		selectedChapterID: chapters.selectedID,
		selectedChapter: getSelectedChapter(state),
	};
};

const mapDispatchToProps = dispatch => ({
	setPlaying: bindActionCreators(settings.setPlaying, dispatch),
	setOptionsOpen: bindActionCreators(settings.setOptionsOpen, dispatch),
	setAboutModalOpen: bindActionCreators(settings.setAboutModalOpen, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ThreeControlBar);
