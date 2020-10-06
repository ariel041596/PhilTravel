<template>
  <q-page padding>
    <my-itineraris></my-itineraris>
    <q-page-sticky class="all-pointer-events" :offset="[18, 18]">
      <q-fab icon="add" direction="up" color="primary">
        <q-fab-action
          label-class="bg-grey-3 text-grey-8"
          external-label
          label-position="top"
          color="primary"
          icon="add"
          label="Post"
        />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  components: {
    "my-itineraris": require("components/PrivateItinerarys/MyItinerarys.vue")
      .default
  }
};
</script>

<style></style>
