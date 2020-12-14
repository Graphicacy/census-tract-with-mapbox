import * as React from 'react';
import ReactMapGL, { Layer, Source } from 'react-map-gl';
import { useEffect, useRef, useState } from 'react';
import Tooltip from './Tooltip';
import { DATA_PROPERTY, LAYER_PROPERTIES, FILL_COLOR_PAINT, SELECTED_LAYER } from '../../constants';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  map: {
    width: '100%',
    height: '100%',
  },
}));

const Map = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    width: 500,
    height: 300,
    activeFeature: null,
    x: 0,
    y: 0,
  });
  const mapRef = useRef(null);
  const mapboxRef = useRef(null);

  useEffect(() => {
    const { offsetWidth, offsetHeight } = mapRef.current;
    setState((prevState) => ({
      ...prevState,
      width: offsetWidth,
      height: offsetHeight,
    }));
  }, []);

  const _onViewportChange = (viewport) =>
    props.setState((prevState) => {
      return {
        ...prevState,
        viewport,
      };
    });

  return (
    <div className={classes.map} ref={mapRef}>
      <ReactMapGL
        {...props.state.viewport}
        ref={mapboxRef}
        width="100%"
        height="100%"
        onMouseLeave={() => {
          const map = mapboxRef.current.getMap();
          map.removeFeatureState({
            source: LAYER_PROPERTIES[SELECTED_LAYER].name,
            sourceLayer: LAYER_PROPERTIES[SELECTED_LAYER].name,
          });
        }}
        onMouseMove={(event) => {
          const {
            srcEvent: { offsetX, offsetY },
          } = event;
          const point = [event.center.x, event.center.y];
          const map = mapboxRef.current.getMap();

          let feature;
          try {
            feature = map.queryRenderedFeatures(point, { layers: ['fill_layer'] })[0];
          } catch (err) {
            return;
          }

          if (feature) {
            if (state.activeFeature) {
              map.removeFeatureState({
                source: LAYER_PROPERTIES[SELECTED_LAYER].name,
                sourceLayer: LAYER_PROPERTIES[SELECTED_LAYER].name,
              });
            }
            map.setFeatureState(
              {
                source: LAYER_PROPERTIES[SELECTED_LAYER].name,
                sourceLayer: LAYER_PROPERTIES[SELECTED_LAYER].name,
                id: feature.id,
              },
              {
                hover: true,
              },
            );
          }

          setState((prevState) => ({
            ...prevState,
            activeFeature: feature,
            x: offsetX,
            y: offsetY,
          }));
        }}
        mapStyle={LAYER_PROPERTIES[SELECTED_LAYER].style}
        onViewportChange={_onViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <Source id={LAYER_PROPERTIES[SELECTED_LAYER].name} type="vector" url={LAYER_PROPERTIES[SELECTED_LAYER].source} />
        <Layer
          type="fill"
          id="fill_layer"
          filter={['has', DATA_PROPERTY]}
          source={LAYER_PROPERTIES[SELECTED_LAYER].name}
          source-layer={LAYER_PROPERTIES[SELECTED_LAYER].name}
          paint={FILL_COLOR_PAINT}
        />
        <Layer
          type="line"
          source={LAYER_PROPERTIES[SELECTED_LAYER].name}
          source-layer={LAYER_PROPERTIES[SELECTED_LAYER].name}
          paint={{
            'line-width': ['case', ['boolean', ['feature-state', 'hover'], false], 3, 0.5],
            'line-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#000', '#969090'],
            'line-opacity': 0.5,
          }}
        />
      </ReactMapGL>
      <Tooltip {...state} />
    </div>
  );
};

export default Map;
