<template
  ><transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div class="">
      <div class="row items-start">
        <div
          v-for="iti in itineraries"
          :key="iti.id"
          class="col-md-3 col-xl-2 col-lg-2 col-xs-6 col-sm-4"
        >
          <q-card class="q-ma-xs" @click="seeMore">
            <q-img
              :src="iti.photos"
              :ratio="4 / 3"
              spinner-color="white"
              transition="slide-up"
            />
            <q-card-section>
              <q-btn
                round
                color="primary"
                icon="place"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%);"
              />

              <div class="row no-wrap items-center">
                <div class="col text-h6 ellipsis">
                  {{ iti.to }}
                </div>
                <div
                  class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
                >
                  <q-icon name="place" />
                  {{ iti.distance }}
                </div>
              </div>

              <q-rating v-model="stars" :max="5" size="15px" />
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1">
                {{ iti.budget | currency("₱", 2, { decimalSeparator: "." }) }}
              </div>
              <div class="text-caption text-grey ellipsis-2-lines">
                {{ iti.description }}
              </div>
            </q-card-section>
            <div class="row">
              <div class="q-px-sm q-pb-sm">
                <q-btn dense flat round icon="favorite" color="red" />
                <q-btn dense flat round icon="chat" color="primary"> </q-btn>
              </div>
              <q-space></q-space>
              <div class="q-pr-sm">
                <q-btn flat dense round icon="navigation" color="secondary" />
              </div>
            </div>
          </q-card>
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
export default {
  data() {
    return {
      itineraries: iti,
      stars: 4
    };
  },
  methods: {
    seeMore() {
      console.log("See More");
    }
  }
};
</script>

<style lang="scss" scoped></style>
