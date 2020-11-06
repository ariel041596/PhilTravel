<template>
  <q-page padding>
    <div>
      <!-- <dashboard></dashboard> -->
      <home></home>
    </div>
  </q-page>
</template>

<script>
export default {
  components: {
    // dashboard: require("components/Dashboard/Dashboard.vue").default
    home: require("components/Dashboard/Home.vue").default
  }
};
</script>

<style></style>
