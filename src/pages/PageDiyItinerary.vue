<template>
  <q-page padding>
    <div>
      <itineraries></itineraries>
    </div>
  </q-page>
</template>

<script>
export default {
  components: {
    itineraries: require("components/Itinerary/PublicItinerarys/Itinerarys.vue")
      .default
  }
};
</script>

<style></style>
