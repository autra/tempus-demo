'use strict';

// OSM map
let ol = require('openlayers');
let ItineraryPoint = require('./ItineraryPoint');
// lyon extent in EPSG:3857
//524252,5728103 : 558211,5754922
let lyonLeft = 524252;
let lyonRight = 558211;
let lyonBottom = 5728103;
let lyonTop = 5754922;
var openLayer = new ol.layer.Tile({
  source: new ol.source.OSM(),
});

let center = [(lyonRight - lyonLeft) / 2 + lyonLeft, (lyonTop - lyonBottom) / 2 + lyonBottom];
let view = new ol.View({
  //center: ol.proj.fromLonLat([37.41, 8.82]),
  zoom: 4,
  center: center,
  resolution: (lyonRight - lyonLeft) / (256 * 4),
  extent: [lyonLeft, lyonBottom, lyonRight, lyonTop]
});
var map = new ol.Map({
  layers: [openLayer],
  target: 'map-container',
  view
});

// Controls
let placeStart = document.getElementById('place-start');
let placeDestination = document.getElementById('place-destination');
let getItinerary = document.getElementById('get-itinerary');

let currentPlaceFn;

const itineraryPointSource = new ol.source.Vector({});
map.addLayer(new ol.layer.Vector({ source: itineraryPointSource}));

let startPoint = new ItineraryPoint(itineraryPointSource, 'A');
let destPoint = new ItineraryPoint(itineraryPointSource, 'B');

function placeFn(point, evt) {
  map.getTargetElement().style.cursor = '';
  currentPlaceFn = null;

  point.place(evt.coordinate);

  if (startPoint.getCoordinates() && destPoint.getCoordinates()) {
    getItinerary.disabled = false;
  }
  // var lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
  // var lon = lonlat[0];
  // var lat = lonlat[1];
  // return [lon, lat];
}

let placeStartFn = evt => {
  let position = placeFn(startPoint, evt)

};
let placeDestFn = evt => placeFn(destPoint, evt);

placeStart.addEventListener('click', () => {
  map.getTargetElement().style.cursor = 'crosshair';
  map.un('click', currentPlaceFn);
  map.once('click', placeStartFn);
  currentPlaceFn = placeStartFn;
});

placeDestination.addEventListener('click', () => {
  map.getTargetElement().style.cursor = 'crosshair';
  map.un('click', currentPlaceFn);
  map.once('click', placeDestFn);
  currentPlaceFn = placeDestFn;
});

getItinerary.addEventListener('click', () => {
  // get info and send them to server
  let startLonLat = startPoint.getCoordinates('EPSG:4326');
  let destLonLat = destPoint.getCoordinates('EPSG:4326');
  console.log('querying:', startLonLat, destLonLat);
});

console.log('loaded');
