<template>
  <div class="bg-white ">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-btn class flat round dense icon="arrow_back" v-close-popup></q-btn>
      Add Itinerary
    </q-toolbar>

    <div class=" q-pa-md">
      <q-form class="text-center" @submit.prevent="addIti">
        <q-input
          :rules="[val => !!val]"
          lazy-rules
          class="col q-mb-none q-pb-sm"
          v-model="itinerary.destination"
          label="Destination"
        >
          <template v-slot:prepend> <q-icon name="place" /> </template
        ></q-input>
        <q-input
          :rules="[val => !!val]"
          lazy-rules
          class="col q-mb-none q-pb-sm"
          type="number"
          v-model="itinerary.budget"
          label="Budget"
        >
          <template v-slot:prepend>
            <q-icon name="account_balance_wallet" /> </template
        ></q-input>
        <q-input
          multiple
          type="file"
          class="col q-mb-none q-pb-sm"
          @change="upload"
        >
          <template v-slot:append>
            <q-circular-progress
              show-value
              class="text-light-blue q-ma-md"
              :value="value"
              size="30px"
              color="primary"
            />
          </template>
          <template v-slot:prepend> <q-icon name="insert_photo" /> </template
        ></q-input>
        <div
          class="q-px-sm col q-mb-none q-pb-sm"
          v-if="itinerary.photos.length"
        >
          <q-carousel
            height="200px"
            v-model="slide"
            swipeable
            animated
            arrows
            navigation
            infinite
            control-color="purple"
            class="rounded-borders"
          >
            <q-carousel-slide
              v-for="(image, index) in itinerary.photos"
              :key="index"
              :name="index"
              :img-src="image"
            >
              <q-btn
                round
                size="xs"
                color="red"
                class="absolute"
                style="top: 15px; right: 5px; transform: translateY(-50%);"
                icon="close"
                @click="deleteImage(image, index)"
              ></q-btn
            ></q-carousel-slide>
          </q-carousel>
        </div>
        <q-editor
          class="col q-mb-none q-pb-sm editor"
          placeholder="Type here to post"
          v-model="itinerary.instruction"
          min-height="5rem"
          max-height="20vh"
        />
        <div class="q-mt-md">
          <q-btn
            :disable="!complete"
            style="width: 90%;"
            rounded
            color="primary"
            type="submit"
            no-caps
            :label="!complete ? 'Please fill up details' : 'Add Itinerary'"
          ></q-btn>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script>
import { fs, fc, db, fb } from "boot/firebase";
export default {
  firestore() {
    return {
      itineraries: fs.collection("itineraries")
    };
  },
  data() {
    return {
      slide: 0,
      value: null,
      itinerary: {
        slide: 1,
        destination: "",
        budget: "",
        instruction: "",
        likes: null,
        commments: null,
        ratings: null,
        photos: []
      },
      descArr: [{ description: "" }]
    };
  },
  computed: {
    complete() {
      return (
        this.itinerary.destination !== "" &&
        this.itinerary.budget !== "" &&
        this.itinerary.instruction !== "" &&
        this.itinerary.photos.length
      );
    }
  },
  methods: {
    addDescription() {
      this.descArr.push({
        description: ""
      });
    },
    removeDescription(index) {
      console.log(index);
      this.descArr.splice(index, 1);
    },
    addIti() {
      this.$q.loading.show();
      const userID = fb.auth().currentUser.uid;
      this.itinerary.createdBy = userID;
      this.$firestore.itineraries
        .add(this.itinerary)
        .then(response => {
          console.log(response);
          this.$q.loading.hide();
          this.$emit("close");
        })
        .catch(error => {
          this.$emit("close");
          console.log(error);
        });
    },
    upload(e) {
      for (var i = 0; i < e.target.files.length; i++) {
        var imageFile = e.target.files[i];

        this.uploadImage(imageFile);
      }
    },
    uploadImage(imageFile) {
      var storageRef = fb
        .storage()
        .ref("photos/" + Math.random() + "_" + imageFile.name);
      let uploadTask = storageRef.put(imageFile);
      uploadTask.on(
        "state_changed",
        snapshot => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.value = progress;
        },
        error => {},
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log(downloadURL);
            this.itinerary.photos.push(downloadURL);
          });
        }
      );
    },
    deleteImage(img, index) {
      let image = fb.storage().refFromURL(img);
      this.itinerary.photos.splice(index, 1);
      image
        .delete()
        .then(() => {
          this.$q.notify({
            message: "Deleted image",
            color: "white",
            textColor: "primary",
            position: "top",
            actions: [
              {
                icon: "close",
                attrs: {
                  "aria-label": "Dismiss"
                }
              }
            ]
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.editor {
  text-align: left;
}
</style>
