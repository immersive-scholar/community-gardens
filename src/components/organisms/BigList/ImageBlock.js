import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'glamor';
import { Watch } from 'scrollmonitor-react';

import Image from '../Image';


import {
  linkStyles,
  image,
  left,
  right,
} from './styles';

const ImageBlock = ({ item, theme, side }) => (
  <Link
    {...linkStyles}
    {...image}
    {...css(side === 'left' ? left : right)}
    to={item.link}
  >
    {/*<Image sources={item.headerImage} colorTheme={item.colorTheme} />*/}
    <Image sources={item.headerImage} theme={theme} />
  </Link>
);
export default Watch(ImageBlock);
