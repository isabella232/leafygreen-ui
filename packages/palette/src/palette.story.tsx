import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from '@emotion/styled';
import { lighten, darken, readableColor, transparentize } from 'polished';
import * as uiColors from './uiColors';

const ColorBlock = styled('div')`
  background-color: ${props => props['data-color'] || 'transparent'};
  border-top-color: transparent;
  display: inline-block;
  position: relative;
  height: 80px;
  width: 80px;
  border-radius: 8px;
  margin: 10px;
  margin-bottom: 20px;
  box-shadow: 0 8px 6px -8px ${props => transparentize(0.7, darken(0.2, props['data-color']))},
    0 2px 3px ${props => transparentize(0.8, darken(0.5, props['data-color']))};

  &:before {
    content: attr(data-color);
    position: absolute;
    bottom: 0.3rem;
    left: 0.3rem;
    right: 0.3rem;
    font-size: 12px;
    text-align: center;
    padding: 3px 0.3rem;
    color: ${props => readableColor(lighten(0.2, props['data-color']))};
    background-color: ${props => lighten(0.2, props['data-color'])};
    border-radius: 4px;
  }

  &:after {
    content: attr(data-name);
    position: absolute;
    top: calc(100% + 8px);
    font-size: 12px;
    text-align: center;
    color: ${uiColors.gray.dark1};
    margin: auto;
    left: -10px;
    right: -10px;
  }
`;
/**
 *
 */

function renderColors() {
  const ranges: Array<string> = Object.keys(uiColors);

  const renderedRanges = ranges.map(range => {
    const currentVal = uiColors[range];

    if (typeof currentVal === 'string') {
      return (
        <ColorBlock key={range} data-color={currentVal} data-name={range} />
      );
    }

    return (
      <div key={range}>
        {Object.keys(currentVal).map(name => (
          <ColorBlock
            key={currentVal[name]}
            data-color={currentVal[name]}
            data-name={`${range} ${name}`}
          />
        ))}
      </div>
    );
  });

  return <div>{renderedRanges}</div>;
}

storiesOf('Palette', module).add('UI', renderColors);