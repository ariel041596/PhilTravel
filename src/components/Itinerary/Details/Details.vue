<template>
  <div>
    <div>
      <div class="q-mb-sm row">
        <q-avatar>
          <img class="account-photo" :src="creatorDetails.photo" />
        </q-avatar>
        <div class="column q-pl-sm">
          <strong>{{ creatorDetails.displayName }}</strong>
          <div class="row text-grey">
            <q-icon name="public" class="globe"></q-icon>
            <q-item-label>1 hour ago</q-item-label>
          </div>
        </div>
        <q-space></q-space>
        <div class="column">
          <label>
            Budget:
            <strong style="font-size: 16px;">{{
              details.budget | currency("₱", 2, { decimalSeparator: "." })
            }}</strong></label
          >
        </div>
      </div>
      <div class="q-mb-sm">
        <div class="text-bold text-red " style="font-size: 18px; ">
          <q-icon class="q-mb-xs" color="teal" name="place"></q-icon>
          {{ details.destination }}
        </div>
        <div class="q-mb-sm instruction" v-html="details.instruction"></div>
        <q-carousel
          class="rounded-borders"
          height="300px"
          v-model="details.slide"
          swipeable
          animated
          arrows
          navigation
          infinite
          control-color="white"
        >
          <q-carousel-slide
            v-for="(image, index) in details.photos"
            :key="index"
            :name="index"
            :img-src="image"
          >
          </q-carousel-slide>
        </q-carousel>
      </div>
      <q-separator />
      <div
        class="row text-grey-9  "
        v-for="like in userLikeData"
        :key="like.id"
      >
        <q-btn
          @click="likeItinerary(details.id, like)"
          no-caps
          flat
          class="col"
          icon="thumb_up_alt"
          label="Like"
          :color="like.like ? 'primary' : 'grey-9'"
        >
        </q-btn>
        <q-separator vertical inset=""></q-separator>
        <q-btn
          @click="commentSection"
          no-caps
          flat
          class="col"
          icon="chat"
          label="Comment"
        >
        </q-btn>
      </div>
      <div class="row text-grey-9 " v-if="!userLikeData.length">
        <q-btn
          @click="likeItinerary(details.id, (like = false))"
          no-caps
          flat
          class="col"
          icon="thumb_up_alt"
          label="Like"
        >
        </q-btn>
        <q-separator vertical inset=""></q-separator>
        <q-btn
          @click="commentSection"
          no-caps
          flat
          class="col"
          icon="chat"
          label="Comment"
        >
        </q-btn>
      </div>
      <q-separator />
      <q-list class="q-pt-xs">
        <q-item v-for="(comment, index) in commentsData" :key="index">
          <q-item-section top avatar>
            <q-avatar v-if="comment.photo" color="primary" text-color="white">
              <img class="account-photo" :src="comment.photo" />
            </q-avatar>
            <q-avatar v-else color="primary" text-color="white">
              {{ comment.displayName.charAt(0) }}
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ comment.displayName }}</q-item-label>
            <q-item-label caption line="2">{{ comment.comment }}</q-item-label>
          </q-item-section>
        </q-item>
        <div v-if="commentSec">
          <q-separator class=""></q-separator>
          <!-- Bug on messagebox need an attribute of true or false for multiple users commenting -->
          <q-input
            autofocus
            @blur="closeCommentSection"
            aria-required
            ref="newMessage"
            bg-color="white"
            class="col q-pt-sm "
            placeholder="Message... Note: Bug on this"
            dense
            rounded
            outlined
            autogrow
            v-model="userComment.comment"
          >
            <q-btn
              :loading="this.loading"
              @click="addComment"
              v-if="userComment.comment"
              round
              dense
              flat
              color="primary"
              icon="send"
            ></q-btn>
          </q-input>
        </div>
      </q-list>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { fs, fb, db } from "boot/firebase";
export default {
  firestore() {
    return {
      itineraries: fs.collection("itineraries"),
      comments: fs.collection("comments"),
      likes: fs.collection("likes")
    };
  },
  data() {
    return {
      comments: "",
      loading: false,
      details: "",
      commentsData: [],
      commentsDatas: "",
      creatorDetails: "",
      userLikeData: "",
      userLike: false,
      commentSec: false,
      userComment: {
        itineraryID: "",
        createdBy: "",
        comment: ""
      }
    };
  },
  computed: {
    ...mapState("auth", ["userDetails"])
  },
  methods: {
    commentSection() {
      this.commentSec = true;
    },
    closeCommentSection() {
      this.commentSec = false;
    },
    addComment() {
      const id = this.$route.params.id;
      const userID = fb.auth().currentUser.uid;
      this.loading = true;
      this.userComment.itineraryID = id;
      this.userComment.createdBy = userID;
      this.$firestore.comments
        .add(this.userComment)
        .then(response => {
          this.loading = false;
          this.userComment.comment = "";
          this.seeComment();
        })
        .catch(error => {});
      //   return new Promise((resolve, reject) => {
      //     fs.collection("comment")
      //       .doc(id)
      //       .collection("messages")
      //       .add(this.userComment)
      //       .then(docRef => {
      //         resolve(this.userComment);
      //         this.loading = false;
      //         this.userComment.comment = "";
      //       })
      //       .catch(function(error) {
      //         reject(error);
      //       });
      //   });
    },
    seeComment() {
      this.commentsData = [];
      const id = this.$route.params.id;
      this.$binding(
        "commentsDatas",
        fs.collection("comments").where("itineraryID", "==", id)
      )
        .then(response => {
          response.forEach(data => {
            let user = {};
            let userDetail = db.ref("users/" + data.createdBy);
            userDetail.on("value", snapshot => {
              user = snapshot.val();
              let merged = { ...data, ...user };
              this.commentsData.push(merged);
            });
            // console.log(merged, "SSSSSSSSSSSSSSSSSSSSSSSs");
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    likeItinerary(details, like) {
      if (like.like == true) {
        // console.log(details, "Details");
        const unlike = like;
        unlike.like = false;
        console.log(unlike, "Unlike");
        this.$firestore.likes
          .doc(like.id)
          .update(unlike)
          .then(response => {
            this.$firestore.likes.doc(like.id).delete();
          })
          .catch(error => {});
      } else {
        var dateNOISO = new Date();
        var dateAgo = dateNOISO.toISOString();
        const displayName = this.userDetails.displayName;
        const userLike = {
          createdBy: "",
          itineraryID: "",
          createdAt: dateAgo,
          displayName: displayName,
          like: true
        };
        const id = this.$route.params.id;
        const userID = fb.auth().currentUser.uid;
        this.loading = true;
        userLike.itineraryID = id;
        userLike.createdBy = userID;
        this.$firestore.likes
          .add(userLike)
          .then(response => {
            this.loading = false;
          })
          .catch(error => {});
      }
    },
    validateUserLike() {
      const id = this.$route.params.id;
      const userID = fb.auth().currentUser.uid;
      this.$binding(
        "userLikeData",
        fs
          .collection("likes")
          .where("itineraryID", "==", id)
          .where("createdBy", "==", userID)
      );
      // .then(res => {
      //   const value = false;
      //   if (res.length) {
      //     this.userLike = true;
      //   } else {
      //     console.log(value);
      //   }
      // })
      // .catch(err => {});
    }
  },
  mounted() {
    let id = this.$route.params.id;
    this.$binding("details", fs.collection("itineraries").doc(id))
      .then(response => {
        let userDetail = db.ref("users/" + response.createdBy);
        userDetail.once("value", snapshot => {
          this.creatorDetails = snapshot.val();
        });
      })
      .catch(err => {
        console.error(err);
      });
    this.seeComment();
    this.validateUserLike();
  }
};
</script>

<style lang="scss" scoped>
.instruction {
  line-height: normal;
}
.globe {
  margin-top: 3px;
}
.account-photo {
  object-fit: cover;
}
</style>
