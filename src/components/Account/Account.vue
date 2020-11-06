<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut absolute-top"
    ><div class="text-center absolute-center">
      <q-btn
        @change="uploadProfile"
        color="grey-5"
        size="md"
        round
        flat
        class="btn-file "
        icon="add_a_photo"
        ><input type="file"
      /></q-btn>
      <q-avatar v-if="userDetails.photo" size="100px">
        <img class="account-photo" :src="userDetails.photo" />
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
        outline
        icon="power_settings_new"
        class="text-teal"
        flat
        rounded
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
  computed: {
    ...mapState("auth", ["loggedIn", "userDetails"])
  },
  methods: {
    logoutUser() {
      fb.auth().signOut();
    },
    uploadProfile(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];
        var storageRef = fb
          .storage()
          .ref("profile/" + Math.random() + "_" + file.name);
        let uploadTask = storageRef.put(file);
        uploadTask.on(
          "state_changed",
          snapshot => {
            // var progress =
            //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // this.value = progress;
          },
          error => {},
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.userDetails.photo = downloadURL;
              this.changeProfile(downloadURL);
            });
          }
        );
      }
    },
    changeProfile(downloadURL) {
      let userID = fb.auth().currentUser.uid;
      db.ref("users/" + userID)
        .update({
          photo: downloadURL
        })
        .then(res => {
          this.$q.notify({
            message: "Successfully change profile photo",
            color: "primary",
            actions: [
              {
                label: "Ok",
                color: "yellow",
                handler: () => {}
              },
              {
                label: "Dismiss",
                color: "white",
                handler: () => {}
              }
            ]
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.profile {
  background: linear-gradient(-10deg, #9c27b0 10%, #ffffffa1 50%, #9c27b0);
  background-repeat: no-repeat;
}
.email {
  opacity: 0.8;
}
.account-photo {
  object-fit: cover;
}
.btn-file {
  position: absolute;
  overflow: hidden;
  top: 80px;
  right: 15px;
  transform: translateY(-50%);
}
.btn-file input[type="file"] {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  cursor: inherit;
  display: block;
}
</style>
