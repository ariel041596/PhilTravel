<template>
  <q-page>
    <home></home>
    <q-page-sticky
      v-if="setAdmin"
      class="all-pointer-events"
      :offset="[18, 18]"
    >
      <q-btn
        @click="showAddNews"
        size="18px"
        round
        color="primary"
        icon="add"
      ></q-btn>
    </q-page-sticky>
  </q-page>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    sampleData: false
  }),
  methods: {
    showAddNews() {
      console.log((this.sampleData = true));
    }
  },
  components: {
    // dashboard: require("components/Dashboard/Dashboard.vue").default
    home: require("components/Dashboard/Home.vue").default
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "setAdmin"])
  }
};
</script>

<style lang="sass" scoped>
.q-page
  background: linear-gradient(to bottom, #076585, #fff)
  &.bg-night
    background: linear-gradient(to bottom, #232526, #414345)
  &.bg-day
    background: linear-gradient(to bottom, #076585, #fff)
</style>
