import React from 'react';
import map from 'lodash/map';

import ImageBlock from './ImageBlock'
import CopyBlock from './CopyBlock'

import {
  itemStyles,
} from './styles';

const BigList = ({ items, theme }) => {
  let index = 0;
  return (
    <div>
      {map(items, item => {
        index++;
        /* eslint-disable  no-unreachable */
        switch (index % 2) {
          case 0:
            return <CopyImageBlock item={item} key={item.slug} theme={theme} />;
            break;
          case 1:
          default:
            return <ImageCopyBlock item={item} key={item.slug} theme={theme} />;
            break;
        }
        /* eslint-enable */
      })}
    </div>
  );
};


const ImageCopyBlock = ({ item, theme }) => (
  <div {...itemStyles} data-component="ImageCopyBlock">
    <ImageBlock item={item} theme={theme} side="left"/>
    <CopyBlock item={item} theme={theme} side="right" />
  </div>
);

const CopyImageBlock = ({ item, theme }) => (
  <div {...itemStyles} data-component="CopyImageBlock">
    <CopyBlock item={item} theme={theme} side="left" />
    <ImageBlock item={item} theme={theme} side="right"/>
  </div>
);

export default BigList;
