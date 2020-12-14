import React from 'react';
import graphicacyLogo from '../../assets/images/Graphicacy_logo.svg';
import Legend from '../Legend';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  builtBy: {
    display: 'flex',
    height: '100px',
    position: 'absolute',
    zIndex: '999',
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& h3': {
      fontSize: '24px',
    },
  },
  builtByContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '15px',
    '& img': {
      marginLeft: '6px',
      marginTop: '10px',
    },
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.builtBy}>
      <div className={classes.builtByContainer}>
        <div>
          <h3>BUILT BY</h3>
        </div>
        <div>
          <a href="https://graphicacy.com" target="_blank" rel="noopener noreferrer">
            <img src={graphicacyLogo} alt="Large G branding for Graphicacy - a data visualization and design firm." />
          </a>
        </div>
      </div>
      <Legend />
    </div>
  );
};

export default Header;
