<template>
  <div>
    <q-card-section>
      <div class="row q-mb-md">
        <q-banner class="col text-center">
          <!-- <q-img src="/img/svg/graphics.svg"></q-img> -->
          <!-- <q-img src="https://placeimg.com/500/300/nature" class="logo"></q-img> -->
          <!-- <template v-slot:avatar>
          <q-icon v-if="tab == 'login'" name="account_circle" color="primary" />
          <q-icon v-if="tab == 'register'" name="person_add" color="primary" />
        </template>-->
          <!-- {{ tab | titleCase }} -->
          <div class="q-mt-md text-h5 text-weight-bold text-grey-9">
            Sign in
          </div>
        </q-banner>
      </div>
      <q-form @submit.prevent="login">
        <q-input
          ref="email"
          class="col q-mb-none q-pb-sm"
          v-model="formData.email"
          label="Email"
          :rules="[
            val =>
              isValidEmailAddress(val) || 'Please enter a valid email address'
          ]"
          lazy-rules
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>
        <q-input
          ref="password"
          class="col q-mb-none q-pb-sm"
          v-model="formData.password"
          label="Password"
          :type="isPwd ? 'password' : 'text'"
          :rules="[val => !!val || 'Field is required']"
          lazy-rules
        >
          <template v-slot:prepend>
            <q-icon name="lock" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div class="q-mt-md column">
          <q-btn
            rounded
            type="submit"
            class="col"
            label="Sign in"
            color="primary"
          >
          </q-btn>
        </div>
      </q-form>
      <q-separator color="primary" class="q-mt-sm" inset />
      <div class=" text-center q-mt-sm column">
        <q-item-label caption>or Signup with</q-item-label>
      </div>
      <div class="q-mt-sm text-center row">
        <q-btn
          @click="signInWithFacebook"
          style="width: 130px"
          rounded
          outline
          icon="facebook"
          class=" facebook"
          >Facebook</q-btn
        >
        <q-space></q-space>
        <q-btn
          @click="signInWithGoogle"
          style="width: 130px"
          rounded
          outline
          color="red"
        >
          <q-avatar size="20px">
            <q-img src="../../assets/icons/google.svg"></q-img>
          </q-avatar>
          &nbsp;&nbsp; Google
        </q-btn>
      </div>
      <div class=" text-center q-mt-xl column">
        <q-item-label caption class="text-grey-7">or Sign-up here</q-item-label>
      </div>
      <div class="text-center text-grey-8 q-mt-xs ">
        <q-btn
          @click="showRegister"
          flat
          rounded
          style="width: 100px"
          label="SIGNUP"
        ></q-btn>
      </div>
    </q-card-section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { fb, fs, fcm, provider } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";
import { QSpinnerFacebook } from "quasar";
export default {
  data() {
    return {
      isPwd: true,
      formData: {
        email: "",
        password: ""
      },
      registerModal: false
    };
  },
  methods: {
    ...mapActions("auth", ["registerUser", "loginUser", "loginGmail"]),
    showRegister() {
      this.$emit("openRegisterDialog");
    },
    register() {
      this.registerUser(this.formData);
    },
    login() {
      this.$refs.email.validate();
      // this.$refs.password.validate();
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        this.loginUser(this.formData);
      }
    },
    signInWithFacebook() {
      console.log("Sign In");
    },
    signInWithGoogle() {
      this.loginGmail();
    },
    isValidEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    isValidPassword(password) {
      var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      return regularExpression.test(password);
    }
  }
};
</script>

<style lang="scss">
.logo {
  height: 100px;
  width: 120px;
  max-width: 300px;
}
.facebook {
  color: #0d8ef1;
}
</style>
