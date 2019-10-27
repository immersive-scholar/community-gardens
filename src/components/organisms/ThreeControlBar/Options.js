import React from 'react';
import { css } from 'glamor';

import PlaybackControls from './PlaybackControls';

import { removePaddingVertical, lightText, inlineBlock } from 'styles';
import { OptionsDiv, container } from './styles';

const Options = ({ optionsOpen, isPlaying, onPlaybackChange }) => {
	return (
		<OptionsDiv
			{...container}
			{...removePaddingVertical}
			{...lightText}
			{...css({ maxWidth: 'none' })}
		>
			<div {...container} {...removePaddingVertical} {...css({ padding: 0 })}>
				OPTIONS{' | '}
				<PlaybackControls
					{...inlineBlock}
					isPlaying={isPlaying}
					onPlaybackChange={onPlaybackChange}
				/>
			</div>
		</OptionsDiv>
	);
};

export default Options;
