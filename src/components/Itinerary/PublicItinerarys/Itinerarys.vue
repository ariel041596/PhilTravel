<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div class="">
      <div class="row items-start" v-if="itinerariesData.length">
        <div
          v-for="(iti, index) in itinerariesData"
          :key="index"
          class="col-md-3 col-xl-2 col-lg-2 col-xs-6 col-sm-4"
        >
          <q-card class="q-ma-xs">
            <q-carousel
              transition-prev="scale"
              transition-next="scale"
              height="110px"
              swipeable
              animated
              v-model="iti.slide"
              :autoplay="10000"
              infinite
            >
              <q-carousel-slide
                v-for="(image, index) in iti.photos"
                :key="index"
                :name="index"
                :img-src="image"
              >
              </q-carousel-slide>
            </q-carousel>

            <div @click="seeMore(iti)">
              <div class="q-px-sm">
                <div class="row no-wrap items-center q-pt-sm">
                  <div class="col text-bold ellipsis ">
                    <q-icon
                      color="accent"
                      name="place"
                      style="margin-top: -3px;"
                    />
                    {{ iti.destination }}
                  </div>
                </div>
                <q-rating readonly v-model="stars" :max="5" size="15px" />
              </div>
              <div class="q-px-sm">
                <div class="q-pt-xs text-bold">
                  {{ iti.budget | currency("₱", 2, { decimalSeparator: "." }) }}
                </div>
                <div class="description  ellipsis-2-lines">
                  <q-item-label v-html="iti.instruction"> </q-item-label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="q-px-sm q-pb-sm">
                <q-btn dense flat round icon="favorite" color="red" />
                <q-btn dense flat round icon="chat" color="primary"> </q-btn>
              </div>
            </div>
          </q-card>
        </div>
      </div>
      <div v-else>
        <div class="absolute-center ">
          <label>No Public itinerary</label>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
const iti = [
  {
    id: 1,
    budget: "125",
    from: "Manila",
    to: "Bulacan",
    description:
      "Step 1 Small plates, salads & sandwiches in an intimate setting.",
    likes: "1",
    comments: "2",
    rating: "5",
    photos: "https://cdn.quasar.dev/img/chicken-salad.jpg",
    distance: "1 km"
  },
  {
    id: 2,
    budget: "200",
    from: "Manila",
    to: "Pangasinan",
    description:
      "Step 2 Small plates, salads & sandwiches in an intimate setting.",
    likes: "4",
    comments: "3",
    rating: "5",
    photos: "https://cdn.quasar.dev/img/parallax2.jpg",
    distance: "5 km"
  },
  {
    id: 3,
    budget: "300",
    from: "Manila",
    to: "Pangasinan",
    description:
      "Step 2 Small plates, salads & sandwiches in an intimate setting.",
    likes: "4",
    comments: "3",
    rating: "5",
    photos: "https://cdn.quasar.dev/img/mountains.jpg",
    distance: "3 km"
  }
];
import { fb, fs } from "boot/firebase";
import { mapState } from "vuex";
export default {
  firestore() {
    return {
      itineraries: fs.collection("itineraries")
    };
  },
  data() {
    return {
      itinerariess: iti,
      stars: 4,
      itinerariesData: ""
    };
  },
  methods: {
    seeMore(iti) {
      this.$router.push("/my-itinerary/" + iti.id);
    }
  },
  mounted() {
    this.$binding(
      "itinerariesData",
      fs.collection("itineraries").where("publish", "==", true)
    );
  }
};
</script>

<style lang="scss" scoped>
.description {
  font-size: 10px;
}
</style>
