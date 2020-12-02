<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <q-page class="flex column home-page" :class="bgClass">
      <div class=" q-pt-sm q-px-md">
        <q-input
          @keyup.enter="getWeatherBySearch"
          v-model="search"
          borderless
          dark
          label="Search"
          color="white"
        >
          <template v-slot:before>
            <q-icon @click="getLocation" name="my_location"></q-icon>
          </template>
          <template v-slot:append>
            <q-btn
              @click="getWeatherBySearch"
              round
              dense
              flat
              icon="search"
            ></q-btn>
          </template>
        </q-input>
      </div>
      <div class="q-mr-sm text-weight-light">
        <div class=" text-white q-pl-sm" style="font-size: 16px;">
          News
        </div>
        <q-scroll-area
          horizontal
          style="height: 215px; width: 100%;"
          class=" rounded-borders"
        >
          <div class="row no-wrap ">
            <div
              v-for="news in newsData"
              :key="news.id"
              style="width: 300px;"
              class="q-pa-sm"
            >
              <q-img
                class="rounded-borders"
                height="200px"
                :src="news.photo"
                :ratio="4 / 3"
              >
                <div
                  class="absolute-full text-subtitle1 text-left "
                  style="margin-top: 30%;"
                >
                  <div>{{ news.article }}</div>
                  <div
                    class="text-weight-thin text-grey-4 e"
                    style="font-size: 11px; line-height: normal;
                  "
                  >
                    {{ news.description }}
                    <div class="text-right">
                      <q-btn outline label="read"></q-btn>
                    </div>
                  </div>
                </div>
              </q-img>
            </div>
          </div>
        </q-scroll-area>
      </div>
      <template v-if="weatherData">
        <div class="col text-white text-center">
          <div class=" text-weight-light ">{{ weatherData.name }}</div>
          <div class=" text-weight-light ">
            {{ weatherData.weather[0].main }}
          </div>
          <div class=" text-weight-thin relative-position">
            <span class="text-h6">
              {{ Math.round(weatherData.main.temp) }}</span
            >
            <span class="degree relative-position"> &deg;C</span>
          </div>
          <div class=" text-center">
            <img
              :src="
                `https://openweathermap.org/img/wn/${this.weatherIcon}@2x.png`
              "
            />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="col column text-center text-white">
          <div class="col text-h6 text-weight-thin">Weather<br />Report</div>
          <q-btn
            @click="getLocation"
            class="col"
            flat
            icon="my_location"
            label="Find my Location"
          ></q-btn>
        </div>
      </template>

      <div class="col bottom-image"></div>
      <!-- <tr v-for="item in POCdata" :key="item.id"> -->
      <!-- <td>{{ item.Article }} {{ item.Description }}</td> -->
      <!-- </tr> -->
    </q-page>
  </transition>
</template>

<script>
// import { vueGsheets } from "vue-gsheets";
import { mapState, mapActions, mapGetters } from "vuex";
import { showErrorMessage } from "src/functions/function-show-error-message";
const news = [
  {
    id: 1,
    article: "Wallet",
    description: "Found in the street of Anawangin",
    photo: "https://placeimg.com/500/300/nature",
    slide: 1
  },
  {
    id: 2,
    article: "Bag",
    description: "Found in the street of Baguio",
    photo: "https://placeimg.com/500/300/nature",
    slide: 2
  },
  {
    id: 3,
    article: "Cellphone",
    description: "Found in the street of Calatagan",
    photo: "https://placeimg.com/500/300/nature",
    slide: 2
  }
];
export default {
  // Change the Https to true on quasar.conf.js if for testing and also the api
  // mixins: [vueGsheets],
  data() {
    return {
      search: "",
      // COLUMNS: 31,
      // sheetPageNumber: 1,
      // // SHEETID: "15yAr-EwwvSm61x3N2idcJrO9qvHXKTHC0ICyOFbMDR8",
      // SHEETID: "1oH35vK05jBvXgWVDzY1aQ3-VEZp2qbG2pm0Bym1tVVU",
      // POCdata: "",
      weatherData: null,
      lat: 14.652508308908967,
      lon: 121.05865600943991,
      apiURL: "Your API URL from Open Weather Map",
      weatherApiKey: "d6e44cb3d1091336c04a62533597f506",
      weatherIcon: null,
      newsData: news
    };
  },
  methods: {
    consolelog() {
      console.log(this.POCdata);
    },
    searchText() {
      const search = this.search;
      const res = this.POCdata.filter(obj =>
        Object.values(obj).some(val => val.includes(search))
      );
      console.log(res);
      // if (!res.length) {
      //   console.log("No records found");
      // } else {
      //   console.log(res);
      // }
    },
    getLocation() {
      if (this.$q.platform.electron) {
        this.$axios.get("https://freegeoip.app/json/").then(position => {
          console.log(position, " position");
          this.lat = position.data.latitude;
          this.lon = position.data.longitude;
          this.getWeatherByCoords();
        });
      } else {
        navigator.geolocation.getCurrentPosition(position => {
          console.log("position", position);
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          this.getWeatherByCoords();
        });
      }
    },
    getWeatherByCoords() {
      // this.$q.loading.show();
      this.$axios(
        `${this.apiURL}?lat=${this.lat}&lon=${this.lon}&appid=${this.weatherApiKey}&units=metric`
      ).then(res => {
        // this.$q.loading.hide();
        // console.log(res.data);
        this.weatherData = res.data;
        this.weatherIcon = res.data.weather[0].icon;
      });
    },
    getWeatherBySearch() {
      this.$q.loading.show();
      this.$axios(
        `${this.apiURL}?q=${this.search}&appid=${this.weatherApiKey}&units=metric`
      )
        .then(res => {
          this.$q.loading.hide();
          // console.log(res.data);
          this.weatherData = res.data;
          this.weatherIcon = res.data.weather[0].icon;
        })
        .catch(err => {
          this.$q.loading.hide();
          const message = "Cannot find location";
          showErrorMessage(message);
        });
    }
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "setAdmin"]),
    bgClass() {
      if (this.weatherData) {
        if (this.weatherData.weather[0].icon.endsWith("n")) {
          return "bg-night";
        } else {
          return "bg-day";
        }
      }
      return "bg-day";
    }
  },
  mounted() {
    this.getLocation();
    // this.POCdata = this.items;
    // console.log(this.items, "ITEMS");
    // console.log(this.POCdata, "ITEMS2");
  }
};
</script>

<style lang="scss" scoped>
.degree {
  top: -5px;
}
// .bottom-image {
//   flex: 0 0 100px;
//   background: url("../../assets/background_image/skyline.png");
//   background-size: contain;
//   background-position: center bottom;
// }
.description {
  font-size: 11px;
}
</style>
