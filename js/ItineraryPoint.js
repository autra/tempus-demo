const ol = require('openlayers');

function ItineraryPoint(source, text) {

  // not placed by default
  let added = false;

  // ol boilerplate
  const marker = new ol.Feature({});
  marker.setStyle(new ol.style.Style({
    text: new ol.style.Text({ text })
  }));
  source.addFeature(marker);
  let point;

  this.place = function(coordinate) {
    if (!point) {
      point = new ol.geom.Point(coordinate);
      marker.setGeometry(point);
    } else {
      point.setCoordinates(coordinate);
    }
  };

  this.getCoordinates = function (crs) {
    if (crs && crs !== 'EPSG:3857') {
      return ol.proj.transform(point.getCoordinates(), 'EPSG:3857', crs);
    } else {
      return point && point.getCoordinates();
    }
  };
}

module.exports = ItineraryPoint;
