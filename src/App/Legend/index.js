import React from 'react';
import { COLORS, LEGEND_COLORS, SI_DOLLAR_FORMATTER } from '../../constants';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  legend: {
    width: (props) => props.width,
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
    '& h4': {
      marginBlockStart: 0,
      marginBlockEnd: '.5rem',
    },
    '& :not(:last-child)': {
      paddingBottom: '.25rem',
    },
    paddingRight: '15px',
    color: COLORS.darkGray,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  legendItem: {
    display: 'flex',
    flexDirection: 'column',
    '& .block': {
      width: '100%',
      height: '15px',
    },
    textAlign: 'end',
  },
}));

const Legend = () => {
  const width = 600;
  const classes = useStyles({ width });

  return (
    <div className={classes.legend}>
      <h4>The ACS-based estimate of Median Household Income from 2013-2017</h4>
      <div className={classes.innerContainer}>
        {LEGEND_COLORS.map(([color, value], idx) => {
          return (
            <div className={classes.legendItem} key={`legend-item-for-${color}`} style={{ width: width / LEGEND_COLORS.length }}>
              <div className="block" style={{ backgroundColor: color }} />
              <div>{`${!idx ? '<' : ''}${SI_DOLLAR_FORMATTER(value)}`}</div>
            </div>
          );
        })}
      </div>
      <div>
        Source:{' '}
        <a
          href="http://data.diversitydatakids.org/dataset/19013_1_d-median-household-income--dollar--by-race-ethnicity/resource/c5334c27-3cf0-439b-b8b0-5ff7eb632b57"
          target="_blank"
          rel="noopener noreferrer"
        >
          diversitydatakids.org
        </a>
      </div>
    </div>
  );
};

export default Legend;
