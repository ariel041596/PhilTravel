<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
    ><div class="text-center absolute-center">
      <q-avatar v-if="userDetails.photo" size="100px" class>
        <img class="" :src="userDetails.photo" />
      </q-avatar>
      <q-avatar
        class="text-center text-grey-8 profile"
        v-if="!this.userDetails.photo"
        size="100px"
      >
        {{ userDetails.displayName.charAt(0).toUpperCase() }}
      </q-avatar>
      <div class="text-h6 q-mt-sm">
        {{ userDetails.displayName }}
      </div>
      <p class="email ">
        <q-icon name="email"></q-icon> {{ userDetails.email }}
      </p>
      <q-btn
        class="text-teal"
        flat
        @click="logoutUser"
        no-caps
        label="Sign out"
      >
      </q-btn>
    </div>
    ></transition
  >
</template>

<script>
import { mapState, mapActions } from "vuex";
import { fb, fs, db } from "boot/firebase";
export default {
  methods: {
    logoutUser() {
      fb.auth().signOut();
    }
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails"])
  }
};
</script>

<style lang="scss">
.profile {
  background: linear-gradient(-10deg, #9c27b0 10%, #ffffffa1 50%, #9c27b0);
  background-repeat: no-repeat;
}
.email {
  opacity: 0.8;
}
</style>
