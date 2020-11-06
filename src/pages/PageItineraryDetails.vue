<template>
  <q-page padding>
    <itinerary-details></itinerary-details>
  </q-page>
</template>

<script>
export default {
  components: {
    "itinerary-details": require("components/Itinerary/Details/Details.vue")
      .default
  }
};
</script>

<style></style>
