// geojson preview module
ckan.module('geojsoninfopreview', function (jQuery, _) {
  return {
    options: {
      lang: jQuery('html').attr('lang'),
      infoTitle: 'Info',
      infoTemplate: '<br>{name_en}<br>{name_my}<br>{area_ac} ac',
      style: function(feature) {
        return {
          opacity: 0.7,
          fillOpacity: 0.1,
          weight: 1,
          className: feature.properties.style_class || ""
        }
      },
      highlightStyle: {
        opacity: 0.7,
        fillOpacity: 0.3,
        weight: 3,
        className: "highlight"
      },
      i18n: {
        'error': _('An error occurred: %(text)s %(error)s')
      },
      extras: function (e) {},
      iconFunction: function(L, feature) { return L.defaultIcon() },
      onClick: false,
      minSize: 0.1,
      hold_infobox: false,
      hold_layer: null
    },

    initialize: function () {
      var self = this;

      if (window.map_options) {
        if (window.map_options.infoTitle && window.map_options.infoTitle[this.options.lang] !== undefined) {
          this.options.infoTitle = window.map_options.infoTitle[this.options.lang]
        }

        if (window.map_options.infoTemplate && window.map_options.infoTemplate[this.options.lang] !== undefined) {
          this.options.infoTemplate = window.map_options.infoTemplate[this.options.lang]
        }
        if (window.map_options.onClick) {
          this.options.onClick = window.map_options.onClick
        }
        this.options.extras = window.map_options.extras
        this.options.iconFunction = window.map_options.iconFunction
        this.options.map_config = window.map_options.map_config

        if (window.map_options.minSize !== undefined) {
          this.options.minSize = window.map_options.minSize
        }
      }

      self.el.empty();
      self.el.append($("<div></div>").attr("id","map"));
      self.map = ckan.commonLeafletMap('map', this.options.map_config);

      self.map.on('click', function(e) {
        self.options.hold_infobox = false
        self.clearStyle(self.options.hold_layer)
        self.options.hold_layer = null
        self.infoBox.update()

        return true
      })

      // infobox, needs closure of self in the update function.
      self.infoBox = L.control();
      self.infoBox.update = function (properties) {
        if (!properties) {
          self.infoBox._div.innerHTML = self.options.infoTitle;
          return
        }
        filtered_props = {}
        for (var k in properties) {
          filtered_props[k] = properties[k] !== null ? properties[k] : ""
        }
        self.infoBox._div.innerHTML = self.options.infoTitle + L.Util.template(self.options.infoTemplate, filtered_props)
      }
      self.infoBox.onAdd = function(m) {
        self.infoBox._div = L.DomUtil.create('div', 'info')
        self.infoBox.update()
        return self.infoBox._div;
      }
      self.infoBox.addTo(self.map)

      // event handlers requiring self closure
      self.onEnter = function(e) {
        if (!self.options.hold_infobox) {
          var layer = e.target;
          self.setStyle(layer)
          self.infoBox.update(layer.feature.properties)
        }
      }

      self.onExit = function(e) {
        if (!self.options.hold_infobox) {
          var layer = e.target;
          if (layer.setStyle) { // setstyle doesn't exist on point features.
            self.clearStyle(layer)
          }
        }
      }

      self.setStyle = function (layer) {
        if (layer && layer.setStyle) { // setstyle doesn't exist on point features.
          layer.setStyle(self.options.highlightStyle)
        }
      }

      self.clearStyle = function (layer) {
        if (layer && layer.setStyle) { // setstyle doesn't exist on point features.
          layer.setStyle(self.options.style(layer.feature))
        }
      }

      self.onClick = function(e) {
        if (self.options['onClick']) {
          if (!self.options.onClick(e)) {
            return false
          }
        }
        var layer = e.target;
        if (self.options.hold_layer) {
          self.clearStyle(self.options.hold_layer)
        }
        self.options.hold_infobox = true
        self.options.hold_layer = layer
        self.setStyle(layer)
        self.infoBox.update(layer.feature.properties)
      }


      console.log('adding listener')
      window.addEventListener("message", self.onMsg(self), false)
      console.log('pinging')
      window.parent.postMessage("ping", window.location.origin)

      // hack to make leaflet use a particular location to look for images
      L.Icon.Default.imagePath = this.options.site_url + 'js/vendor/leaflet/dist/images';

      jQuery.getJSON(preload_resource['url']).done(
        function(data){
          self.loadedData = data
          self.loadedData.features.forEach(self.options.extras)
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
        console.log('iframe: received message')
        if (e.origin != window.location.origin) {
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
      console.log('iframe: posting filtered')
      window.parent.postMessage({'filtered': geojsonFeature}, window.location.origin)
      var gjLayer = L.Proj.geoJson(geojsonFeature, {
        style: self.options.style,
        pointToLayer: function(feature, latlng) {
          var _icon = self.options.iconFunction(L, feature)
          return L.marker(latlng, {icon: _icon});
        },
        onEachFeature: function(feature, layer) {
          // if there's only one feature, make sure that
          // it's highlighted in the info box.
          if (geojsonFeature.features.length > 1) {
            layer.on({ mouseover: self.onEnter,
                       mouseout: self.onExit,
                       click: self.onClick
                     })
          } else {
            self.infoBox.update(feature.properties)
            layer.on({
              click: self.onClick
            })

          }
        }
      }).addTo(self.map);
      var bounds = gjLayer.getBounds();
      // inset no matter what
      bounds._northEast.lat += self.options.minSize
      bounds._southWest.lat -= self.options.minSize
      bounds._northEast.lon -= self.options.minSize
      bounds._southWest.lon += self.options.minSize
      self.map.fitBounds(bounds);
      return gjLayer
    }
  };
});
