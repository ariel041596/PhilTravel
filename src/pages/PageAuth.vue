<template>
  <q-page>
    <div v-if="!loggedIn">
      <div class=" ">
        <!-- <q-header elevated>
          <q-toolbar class="bg-primary">
            <q-toolbar-title class="toolbar row">
              <img class="logo-header" />
              <div class="text-dark text-h6 q-mt-xs  ">
                <strong class=" text-white">PhilTravel</strong>
              </div>
            </q-toolbar-title>

            <q-btn
              @click="notLoggedInModal"
              outline
              color="white"
              label="Get Started"
              rounded
              no-caps
              unelevated
            />
          </q-toolbar>
        </q-header> -->

        <q-dialog v-model="notLoggedIn">
          <q-card flat style="width: 400px;  max-width: 100vh;">
            <login @openRegisterDialog="showRegisterModal"></login>
          </q-card>
        </q-dialog>
        <q-dialog v-model="registerModal">
          <q-card flat style="width: 400px; max-width: 100vh;">
            <register @openLoginDialog="showLoginDialog"></register>
          </q-card>
        </q-dialog>
      </div>
      <div>
        <q-carousel
          swipeable
          animated
          v-model="slide"
          :autoplay="autoplay"
          ref="carousel"
          infinite
          class="carousel"
        >
          <q-carousel-slide
            :name="1"
            class="img "
            img-src="../assets/background_image/San_Juan_2.jpg"
          >
            <div class="absolute-bottom ">
              <div class="absolute-bottom custom-caption">
                <div class="text-h4">
                  <p>
                    The <span class="text-warning"> best travel</span> <br />
                    in the world
                  </p>
                </div>
                <div class="col-6">{{ quote }}</div>
                <div class="text-center">
                  <q-btn
                    @click="notLoggedInModal"
                    color="primary"
                    text-color="white"
                    label="Explore Now"
                    rounded
                    no-caps
                    style="width: 70%; margin-bottom: 20%; margin-top: 20%;"
                  />
                </div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide
            :name="2"
            class="img "
            img-src="../assets/background_image/Magalawa_Tent.jpg"
          >
            <div class="absolute-bottom ">
              <div class="absolute-bottom custom-caption">
                <div class="text-h3 text-warning">Magalawa</div>
                <div class="">
                  Camping with the tent at the beach
                </div>
                <div class="text-center">
                  <q-btn
                    @click="notLoggedInModal"
                    color="primary"
                    text-color="white"
                    label="Explore Now"
                    rounded
                    no-caps
                    style="width: 70%; margin-bottom: 20%; margin-top: 20%;"
                  />
                </div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide
            :name="3"
            class="img "
            img-src="../assets/background_image/Baguio.jpg"
          >
            <div class="absolute-bottom ">
              <div class="absolute-bottom custom-caption">
                <div class="text-h3 text-white">Baguio</div>
                <div class="">
                  Strawberry farm for you and for me
                </div>
                <div class="text-center">
                  <q-btn
                    @click="notLoggedInModal"
                    color="primary"
                    text-color="white"
                    label="Explore Now"
                    rounded
                    no-caps
                    style="width: 70%; margin-bottom: 20%; margin-top: 20%;"
                  />
                </div>
              </div>
            </div>
          </q-carousel-slide>

          <template v-slot:control>
            <q-carousel-control
              position="bottom-right"
              :offset="[18, 18]"
              class="q-gutter-xs"
            >
              <q-btn
                push
                round
                dense
                color="primary"
                text-color="white"
                icon="arrow_left"
                @click="$refs.carousel.previous()"
              />
              <q-btn
                push
                round
                dense
                color="primary"
                text-color="white"
                :icon="autoplay ? 'pause' : 'play_arrow'"
                @click="autoplay = !autoplay"
              />
              <q-btn
                push
                round
                dense
                color="primary"
                text-color="white"
                icon="arrow_right"
                @click="$refs.carousel.next()"
              />
            </q-carousel-control>
          </template>
        </q-carousel>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
const bgImg = [
  {
    id: 1,
    name: 1,
    img: "../assets/background_image/San_Juan_2.jpg"
  },
  {
    id: 2,
    name: 2,
    img: "../assets/background_image/Magalawa_Tent.jpg"
  },
  {
    id: 3,
    name: 3,
    img: "../assets/background_image/Baguio.jpg"
  },
  {
    id: 4,
    name: 4,
    img: "../assets/background_image/San_Juan.jpg"
  },
  {
    id: 5,
    name: 5,
    img: "../assets/background_image/Calatagan.jpg"
  }
];
export default {
  data() {
    return {
      bgImgs: bgImg,
      notLoggedIn: false,
      registerModal: false,
      slide: 1,
      autoplay: true,
      lorem:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, maxime. Molestias dolore dicta, laudantium vero nemo deserunt repellendus error esse!",
      quote:
        "Live without limits the world is made to explore and appreciate its beauty"
    };
  },
  methods: {
    notLoggedInModal() {
      this.notLoggedIn = !this.notLoggedIn;
    },
    showRegisterModal() {
      this.notLoggedIn = false;
      this.registerModal = true;
    },
    showLoginDialog() {
      this.registerModal = false;
      this.notLoggedIn = true;
    }
  },

  components: {
    login: require("components/Auth/Login.vue").default,
    register: require("components/Auth/Register.vue").default
  },
  computed: {
    ...mapState("auth", ["loggedIn"])
  }
};
</script>

<style lang="scss">
.custom-caption {
  text-align: left;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
.carousel {
  height: 100vh;
}

// For Web
// @media screen and (min-width: 768px) {
//   .carousel {
//     height: 93.3vh;
//   }
// }
// For Mobile
// @media screen and (max-width: 768px) {
// .carousel {
//     height: 93.3vh;
//   }
// }
</style>
