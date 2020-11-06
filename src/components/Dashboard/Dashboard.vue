<template>
  <div style="height: 500px; width: 100%">
    <l-map
      @dblclick="onMapClick"
      ref="map"
      :zoom="zoom"
      :center="[
        userLocation.lat || defaultLocation.lat,
        userLocation.lng || defaultLocation.lng
      ]"
    >
      <l-tile-layer
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
      />
      <l-geosearch :options="geoSearchOptions"></l-geosearch>
      <l-marker
        v-if="position.lat && position.lng"
        visible
        draggable
        :lat-lng="userLocation"
        @dragstart="dragging = true"
        @dragend="dragging = false"
      >
        <l-tooltip :content="tooltipContent" :options="{ permanent: true }" />
      </l-marker>
    </l-map>
  </div>
</template>
<script>
import { LMap, LMarker, LTileLayer, LTooltip } from "vue2-leaflet";
import { icon } from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import LGeosearch from "vue2-leaflet-geosearch";
export default {
  props: {
    value: {
      type: Object,
      required: true
    },
    defaultLocation: {
      type: Object,
      default: () => ({
        lat: 14.7566,
        lng: 121.045
      })
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LGeosearch
  },
  data() {
    return {
      loading: false,
      geoSearchOptions: {
        provider: new OpenStreetMapProvider(),
        showMarker: false,
        autoClose: true
      },
      userLocation: {},
      icon: icon({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
      }),
      position: {},
      address: "",
      tileProvider: {
        attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      },
      zoom: 18,
      dragging: false
    };
  },
  watch: {
    position: {
      deep: true,
      async handler(value) {
        this.address = await this.getAddress();
        this.$emit("input", { position: value, address: this.address });
      }
    }
  },
  computed: {
    tooltipContent() {
      if (this.dragging) return "...";
      if (this.loading) return "Loading...";
      return `<strong>${this.address.replace(
        ",",
        "<br/>"
      )}</strong> <hr/><strong>lat:</strong> ${
        this.position.lat
      }<br/> <strong>lng:</strong> ${this.position.lng}`;
    }
  },
  methods: {
    async getAddress() {
      this.loading = true;
      let address = "Unresolved address";
      try {
        const { lat, lng } = this.position;
        const result = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        if (result.status === 200) {
          const body = await result.json();
          address = body.display_name;
        }
      } catch (e) {
        console.error("Reverse Geocode Error->", e);
      }
      this.loading = false;
      return address;
    },
    async onMapClick(value) {
      // place the marker on the clicked spot
      this.position = value.latlng;
    },
    onSearch(value) {
      const loc = value.location;
      this.position = { lat: loc.y, lng: loc.x };
    },
    async getUserPosition() {
      // check if API is supported
      if (navigator.geolocation) {
        // get  geolocation
        navigator.geolocation.getCurrentPosition(pos => {
          // set user location
          this.userLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
        });
      }
    }
  },
  mounted() {
    this.getUserPosition();
    this.$refs.map.mapObject.on("geosearch/showlocation", this.onSearch);
  }
};
</script>
