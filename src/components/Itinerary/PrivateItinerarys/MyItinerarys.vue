<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
  >
    <div class="">
      <div class="row items-start" v-if="itinerariesData.length">
        <div
          v-for="(iti, index) in itinerariesData"
          :key="index"
          class="col-md-3 col-xl-2 col-lg-2 col-xs-6 col-sm-4"
        >
          <q-card class="q-ma-xs">
            <q-carousel
              transition-prev="scale"
              transition-next="scale"
              height="110px"
              swipeable
              animated
              v-model="iti.slide"
              :autoplay="10000"
              infinite
            >
              <q-carousel-slide
                v-for="(image, index) in iti.photos"
                :key="index"
                :name="index"
                :img-src="image"
              >
              </q-carousel-slide>
            </q-carousel>
            <q-btn
              @click="editIti(iti)"
              size="12px"
              round
              color="primary"
              icon="edit"
              class="absolute"
              style="top: 100px; right: 5px; transform: translateY(-50%);"
            />
            <div @click="seeMore(iti)">
              <div class="q-px-sm">
                <div class="row no-wrap items-center q-pt-sm">
                  <div class="col text-bold ellipsis ">
                    <q-icon
                      color="accent"
                      name="place"
                      style="margin-top: -3px;"
                    />
                    {{ iti.destination }}
                  </div>
                </div>
                <q-rating readonly v-model="stars" :max="5" size="15px" />
              </div>
              <div class="q-px-sm">
                <div class="q-pt-xs text-bold">
                  {{ iti.budget | currency("₱", 2, { decimalSeparator: "." }) }}
                </div>
                <div class="description  ellipsis-2-lines">
                  <q-item-label v-html="iti.instruction"> </q-item-label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="q-px-sm q-pb-sm">
                <q-btn dense flat round icon="favorite" color="red" />
                <q-btn dense flat round icon="chat" color="primary"> </q-btn>
              </div>
              <q-space></q-space>
              <div class="q-pr-sm">
                <q-btn
                  @click="publish(iti)"
                  flat
                  dense
                  round
                  icon="publish"
                  color="secondary"
                />
              </div>
            </div>
          </q-card>
        </div>
      </div>
      <div v-else>
        <div class="absolute-center ">
          <label>No Itinerary</label>
        </div>
      </div>
      <q-dialog
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
        v-model="showEditItinerary"
      >
        <edit-itinerary
          :itinerary="itinerary"
          @close="showEditItinerary = false"
        ></edit-itinerary>
      </q-dialog>
    </div>
  </transition>
</template>

<script>
import { fb, db, fs, fc } from "boot/firebase";
import { mapState } from "vuex";
export default {
  firestore() {
    return {
      itineraries: fs.collection("itineraries")
    };
  },
  data() {
    return {
      itinerary: "",
      showEditItinerary: false,
      maximizedToggle: true,
      autoplay: true,
      slide: 0,
      itinerariesData: "",
      stars: 4
    };
  },
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails", "setID"])
  },
  methods: {
    editIti(iti) {
      this.showEditItinerary = true;
      this.itinerary = iti;
    },
    seeMore(iti) {
      // console.log(iti.id);
      this.$router.push("/my-itinerary/" + iti.id);
    },
    publish(iti) {
      iti.publish = true;
      this.$q.loading.show();
      this.$firestore.itineraries
        .doc(iti.id)
        .update(iti)
        .then(response => {
          this.$q.loading.hide();
        })
        .catch(error => {
          this.$q.loading.hide();
        });
    }
  },
  created() {
    // .where("createdBy", "==", this.setID.userID)
    this.$binding("itinerariesData", fs.collection("itineraries"));
  },
  components: {
    "edit-itinerary": require("components/Itinerary/Modal/EditItinerary.vue")
      .default
  }
};
</script>

<style lang="scss" scoped>
.description {
  font-size: 10px;
  opacity: 0.8;
}
</style>
