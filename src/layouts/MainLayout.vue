<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class="bg-white"
      v-if="loggedIn && this.$route.fullPath !== '/home'"
    >
      <q-toolbar class="q-pl-none">
        <q-btn
          dense
          color="primary"
          v-if="loggedIn && this.$route.params.id"
          flat
          round
          icon="arrow_back"
          aria-label="Menu"
          v-go-back.single
        />
        <q-btn
          class="drawer"
          v-if="loggedIn && !this.$route.params.id"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="text-grey text-subtitle1">
          <!-- <q-avatar
            v-if="!this.$route.params.id"
            class="sideLogo"
            size="35px"
            color="red"
            >P</q-avatar
          > -->
          {{ title }}
        </q-toolbar-title>

        <div>
          <q-btn dense flat round icon="notifications" />
        </div>
      </q-toolbar>
    </q-header>
    <q-footer class="footer bg-grey-11  text-dark" v-if="loggedIn" elevated>
      <q-tabs active-color="red" no-caps>
        <q-route-tab
          class="route-tab-label"
          clickable
          v-for="nav in essentialLinks"
          :key="nav.title"
          exact
          :to="nav.to"
          :icon="nav.icon"
          ><label>{{ nav.title }}</label>
        </q-route-tab>
      </q-tabs>
    </q-footer>

    <q-drawer
      v-if="loggedIn"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      class="drawer"
    >
      <q-list padding>
        <q-item-label header class="text-grey-8">
          Navigation
        </q-item-label>
        <div>
          <q-img
            class="absolute-top"
            src="https://cdn.quasar.dev/img/material.png"
            style="height: 150px"
          >
            <div class="absolute-bottom bg-transparent">
              <q-avatar size="56px" class="q-mb-sm">
                <img class="account-photo" :src="userDetails.photo" />
              </q-avatar>
              <div class="text-weight-bold">
                {{ this.userDetails.displayName }}
              </div>
              <div>{{ this.userDetails.email }}</div>
            </div>
          </q-img>
        </div>
        <div class="q-pt-xl" style="margin-top: 53px;">
          <EssentialLink
            v-for="to in essentialLinks"
            :key="to.title"
            v-bind="to"
          />

          <!-- <q-list v-for="to in essentialLinks" :key="to.title">
            <q-item v-ripple :to="to.to" exact clickable>
              <q-item-section avatar>
                <q-icon :name="to.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ to.title }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list> -->
          <q-item v-ripple clickable @click="logoutUser">
            <q-item-section avatar>
              <q-icon name="power_settings_new" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { fb, db, fs, fc } from "boot/firebase";
import { mapState, mapActions, mapGetters } from "vuex";
import EssentialLink from "components/EssentialLink.vue";

const linksData = [
  // {
  //   title: "Dashboard",
  //   caption: "",
  //   icon: "dashboard",
  //   link: "",
  //   to: "/"
  // },
  {
    title: "Home",
    caption: "",
    icon: "home",
    link: "",
    to: "/home"
  },
  {
    title: "DIY Itinerary",
    caption: "",
    icon: "flight_takeoff",
    link: "",
    to: "/diy-itinerary"
  },
  {
    title: "My DIY Itenerary",
    caption: "",
    icon: "tour",
    link: "",
    to: "/my-itinerary"
  },
  {
    title: "Account",
    caption: "",
    icon: "account_circle",
    link: "",
    to: "/account"
  }
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    };
  },
  methods: {
    logoutUser() {
      fb.auth().signOut();
    }
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "setAdmin"]),
    title() {
      let currentPath = this.$route.fullPath;
      if (currentPath == "/") return "PhilTravel";
      else if (currentPath.includes("/my-itinerary/" + this.$route.params.id))
        return "Details";
      else if (currentPath.includes("/my-itinerary")) return "My Itinerary";
      else if (currentPath.includes("/diy-itinerary")) return "Itineraries";
      else if (currentPath.includes("/home")) return "";
      else return "PhilTravel";
    }
  },
  mounted() {
    console.log(this.userDetails);
  }
};
</script>

<style lang="scss">
// For Web
@media screen and (min-width: 768px) {
  .footer {
    display: none;
  }
}
// For Mobile
@media screen and (max-width: 768px) {
  .drawer {
    display: none;
  }
}
.sideLogo {
  margin-left: -9px;
}
.route-tab-label {
  font-size: 10px;
}
.account-photo {
  object-fit: cover;
}
</style>
