import React, { useState } from 'react';
import Map from './Map';
import { DEFAULT_VIEWPORT } from '../constants';
import Header from './Header';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  app: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    margin: '0 auto',
    overflowY: 'hidden',
  },
}));

const App = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    viewport: DEFAULT_VIEWPORT,
  });

  return (
    <div className={classes.app}>
      <Header />
      <Map state={state} setState={setState} />
    </div>
  );
};

export default App;
