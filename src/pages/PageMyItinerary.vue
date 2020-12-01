<template>
  <q-page padding>
    <my-itineraris></my-itineraris>
    <q-page-sticky class="all-pointer-events" :offset="[18, 18]">
      <q-btn
        size="18px"
        round
        color="primary"
        icon="add"
        @click="showPostItinerary = true"
      ></q-btn>
      <!-- <q-fab
        label-class="bg-grey-3 text-grey-8"
        external-label
        label-position="top"
        color="primary"
        icon="add"
        @click="showPostItinerary = true"
        direction="up"
      > -->
      <!-- <q-fab-action
          label-class="bg-grey-3 text-grey-8"
          external-label
          label-position="top"
          color="primary"
          icon="add"
          label="Post"
          @click="showPostItinerary = true"
        /> -->
      <!-- </q-fab> -->
    </q-page-sticky>
    <q-dialog
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
      v-model="showPostItinerary"
    >
      <post-itinerary @close="showPostItinerary = false"></post-itinerary>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      maximizedToggle: true,
      showPostItinerary: false
    };
  },
  components: {
    "my-itineraris": require("components/Itinerary/PrivateItinerarys/MyItinerarys.vue")
      .default,
    "post-itinerary": require("components/Itinerary/Modal/AddItinerary.vue")
      .default
  }
};
</script>

<style></style>
