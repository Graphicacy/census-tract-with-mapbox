import { format } from 'd3-format';
import { schemeBlues } from 'd3-scale-chromatic';
import { merge } from 'd3-array';

export const COLORS = {
  darkGray: '#343131',
  white: '#fff',
  black: '#000',
};

export const DEFAULT_VIEWPORT = {
  latitude: 41.5096879,
  longitude: -73.0447974,
  zoom: 8,
  bearing: 0,
  pitch: 0,
};

export const DOLLAR_FORMATTER = format('$,.0f');
export const SI_DOLLAR_FORMATTER = format('$.3s');

export const SELECTED_LAYER = 'clipped';
export const DATA_PROPERTY = 'total_est';
export const DATA_LABEL = 'Median Household Income';

export const LAYER_PROPERTIES = {
  clipped: {
    style: 'mapbox://styles/graphicacy/ckhs3vpu21oqb19nyrsvzaq8n',
    name: 'tractsclippedbystatewithdata',
    source: 'mapbox://graphicacy.d4j3v1uy',
  },
};

// Color the census tracts based on the 7 Jenks bins from CartoDB SQL function
const bins = [36836, 52390, 69315, 91857, 120714, 166635, 250002];
export const LEGEND_COLORS = schemeBlues[7].map((d, i) => [d, bins[i]]);
const FILL_COLOR = ['step', ['get', DATA_PROPERTY]].concat(merge(LEGEND_COLORS)).concat('#fff');
export const FILL_COLOR_PAINT = {
  'fill-color': FILL_COLOR,
  'fill-opacity': 1,
};
