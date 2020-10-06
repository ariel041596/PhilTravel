<template>
  <q-page padding>
    <div>
      <dashboard></dashboard>
    </div>
  </q-page>
</template>

<script>
export default {
  components: {
    dashboard: require("components/Dashboard/Dashboard.vue").default
  }
};
</script>

<style></style>
