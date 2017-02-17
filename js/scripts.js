'use strict';
let ol = require('openlayers');
// lyon extent in EPSG:3857
//524252,5728103 : 558211,5754922
let lyonLeft = 524252;
let lyonRight = 558211;
let lyonBottom = 5728103;
let lyonTop = 5754922;
var openLayer = new ol.layer.Tile({
  source: new ol.source.OSM(
    //{
    //attributions: [],
    //url: 'http://tile.openstreetmap.org/${z}/${x}/${y}.png' }
    ),
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

console.log('loaded');
