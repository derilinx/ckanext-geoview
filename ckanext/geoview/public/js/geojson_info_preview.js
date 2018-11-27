// geojson preview module
ckan.module('geojsoninfopreview', function (jQuery, _) {
  return {
    options: {
      infoTitle: 'Info',
      infoTemplate: '<br>{name_of_site_en}<br>{name_of_site_my}<br>{area_ac} ac',
      style: {
        opacity: 0.7,
        fillOpacity: 0.1,
        weight: 2
      },
      highlightStyle: {
        opacity: 0.7,
        fillOpacity: 0.2,
        weight: 3
      },
      i18n: {
        'error': _('An error occurred: %(text)s %(error)s')
      }
    },
    initialize: function () {
      var self = this;

      self.el.empty();
      self.el.append($("<div></div>").attr("id","map"));
      self.map = ckan.commonLeafletMap('map', this.options.map_config);

      // infobox, needs closure of self in the update function.
      self.infoBox = L.control();
      self.infoBox.update = function (properties) {
        if (!properties) {
          self.infoBox._div.innerHTML = self.options.infoTitle;
          return
        }
        self.infoBox._div.innerHTML = self.options.infoTitle + L.Util.template(self.options.infoTemplate, properties)
      }
      self.infoBox.onAdd = function(m) {
        self.infoBox._div = L.DomUtil.create('div', 'info')
        self.infoBox.update()
        return self.infoBox._div;
      }
      self.infoBox.addTo(self.map)

      // event handlers requiring self closure
      self.onEnter = function(e) {
        var layer = e.target;
        if (layer.setStyle) { // setstyle doesn't exist on point features.
          layer.setStyle(self.options.highlightStyle)
        }
        //console.log(layer.feature.properties)
        self.infoBox.update(layer.feature.properties)
      }

      self.onExit = function(e) {
        self.geoJsonLayers.setStyle(self.options.style)
        self.infoBox.update()
      }

      window.addEventListener("message", self.onMsg(self), false)
      window.parent.postMessage("ping", window.origin)

      // hack to make leaflet use a particular location to look for images
      L.Icon.Default.imagePath = this.options.site_url + 'js/vendor/leaflet/dist/images';

      jQuery.getJSON(preload_resource['url']).done(
        function(data){
          self.loadedData = data
          self.geoJsonLayers = self.showPreview(data);
        })
      .fail(
        function(jqXHR, textStatus, errorThrown) {
          self.showError(jqXHR, textStatus, errorThrown);
        }
      );

      // The standard CRS for GeoJSON according to RFC 7946 is
      // urn:ogc:def:crs:OGC::CRS84, but proj4s uses a different name
      // for it. See https://github.com/ckan/ckanext-geoview/issues/51
      proj4.defs['OGC:CRS84'] = proj4.defs['EPSG:4326'];
    },

    onMsg: function(self) {
      return function(e) {
        // filter on event.origin
        if (e.origin != window.origin) {
          return false
        }
        if (! self.loadedData) {
          return
        }
        // filter the map
        var evt_data = e.data
        var filter = evt_data['filter']
        var map_data = { 'type': self.loadedData.type,
                         'name': self.loadedData.name,
                         'crs': self.loadedData.crs,
                         'features': []
                       }
        if (filter) {
          filter_func = function(props) {
            return Object.keys(filter).map(function(k) {
              return props[k] == filter[k]
            }).every(function(x) { return x })
          }

          self.loadedData.features.forEach(function(feat) {
            if (filter_func(feat['properties'])) {
              map_data.features.push(feat)
            }
          })
        } else {
          map_data.features = self.loadedData.features
        }
        self.map.removeLayer(self.geoJsonLayers)
        self.geoJsonLayers = self.showPreview(map_data)
      }
    },


    showError: function (jqXHR, textStatus, errorThrown) {
      if (textStatus == 'error' && jqXHR.responseText.length) {
        this.el.html(jqXHR.responseText);
      } else {
        this.el.html(this.i18n('error', {text: textStatus, error: errorThrown}));
      }
    },

    showInfoBox: function () {
      var self = this;
      var infoBox = L.control();
      infoBox.onAdd = function(m) {
        this._div = L.DomUtil.create('div', 'info')
        this.update()
        return this._div;
      }
      infoBox.update = function (properties) {
        if (!properties) {
          this._div.innerHTML = self.options.infoTitle;
          return
        }
        this._div.innerHTML = self.options.infoTitle + L.Util.template(self.options.infoTemplate, properties)
      }
      infoBox.addTo(self.map)
      return infoBox
    },

    showPreview: function (geojsonFeature) {
      var self = this;
      var min_size = .2;
      var gjLayer = L.Proj.geoJson(geojsonFeature, {
        style: self.options.style,
        onEachFeature: function(feature, layer) {
          layer.on({ mouseover: self.onEnter,
                     mouseout: self.onExit,
                     click: self.onEnter
                   })
        }
      }).addTo(self.map);
      var bounds = gjLayer.getBounds();
      if (bounds._northEast.equals(bounds._southWest)) {
        bounds._northEast.lat += min_size
        bounds._southWest.lat -= min_size
        bounds._northEast.lon -= min_size
        bounds._southWest.lon += min_size
      }
      self.map.fitBounds(bounds);
      return gjLayer
    }
  };
});
