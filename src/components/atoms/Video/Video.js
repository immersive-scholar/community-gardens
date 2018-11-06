import React from 'react';
import Vimeo from 'react-vimeo';
import { css } from 'glamor';
import Image from '../Image';

import './styles.css';

import { videoWrapper, relative, pointerless } from './styles';

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isPlaying: false };
    this.timeout = 0;
  }

  togglePlaying = () => {
    this.setState({
      isPlaying: !this.state.isPlaying,
    });
  };

  play = () => {
    this.setState({ isPlaying: true });
  };

  render() {
    const { videoId, sources } = this.props;
    const { isPlaying } = this.state;
    return (
      <div {...relative}>
        <div {...videoWrapper} {...css(isPlaying ? { opacity: 0 } : {})}>
          {!isPlaying && [
            <button
              className="vimeo-play-button"
              type="button"
              {...pointerless}
              key="button"
            >
              <svg
                version="1.1"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M79.674,53.719c2.59-2.046,2.59-5.392,0-7.437L22.566,1.053C19.977-0.993,18,0.035,18,3.335v93.331c0,3.3,1.977,4.326,4.566,2.281L79.674,53.719z" />
              </svg>
            </button>,
            <div key="image" onClick={() => this.play()}>
              <Image sources={sources} ratio="16x9" />
            </div>,
          ]}
        </div>
        {isPlaying && <Vimeo videoId={videoId} autoplay />}
      </div>
    );
  }
}
export default Video;
