import React from 'react';
import { makeStyles } from '@material-ui/core';
import { COLORS, DATA_LABEL, DATA_PROPERTY, DOLLAR_FORMATTER } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    position: 'absolute',
    margin: '8px',
    fontSize: '10px',
    zIndex: '9',
    pointerEvents: 'none',
    width: (props) => props.tooltipWidth,
    height: (props) => props.tooltipHeight,
    boxShadow: '0 3px 6px #00000029',
    textAlign: 'center',
    borderRadius: '8px',
  },
  header: {
    width: '100%',
    height: '100%',
    background: `${COLORS.white} 0 0 no-repeat padding-box`,
    color: COLORS.darkGray,
    padding: '10px',
  },
}));

const Tooltip = ({ activeFeature, x, y, width, height }) => {
  const tooltipWidth = 300;
  const tooltipHeight = 100;
  const buffer = 10;
  const classes = useStyles({ tooltipWidth, tooltipHeight });

  if (!activeFeature) return null;

  // If the tooltip is going over the edge of the right side of the screen
  if (tooltipWidth + x > width - buffer) {
    x -= tooltipWidth;
  }

  // If the tooltip is going over the edge of the bottom side of the screen
  if (tooltipHeight + y > height - buffer) {
    y -= tooltipHeight;
  }

  return (
    <div className={classes.tooltip} style={{ left: x, top: y }}>
      <div className={classes.header}>
        <h2>{activeFeature.properties.name}</h2>
        <h2>{`${DATA_LABEL}: ${DOLLAR_FORMATTER(activeFeature.properties[DATA_PROPERTY])}`}</h2>
      </div>
    </div>
  );
};

export default Tooltip;
