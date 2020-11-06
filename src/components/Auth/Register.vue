<template>
  <div>
    <q-card-section>
      <div class="row q-mb-md">
        <q-banner class="col text-center">
          <div class="text-h5 text-weight-bold text-grey-9">Register</div>
        </q-banner>
      </div>
      <q-form @submit.prevent="register">
        <q-input
          ref="firstName"
          class="col q-mb-none q-pb-sm"
          v-model="formData.firstName"
          label="First Name"
          :rules="[val => !!val || 'Field is required']"
          lazy-rules
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <q-input
          ref="lastName"
          class="col q-mb-none q-pb-sm"
          v-model="formData.lastName"
          label="Last Name"
          :rules="[val => !!val || 'Field is required']"
          lazy-rules
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
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
            label="Register"
            color="primary"
          >
          </q-btn>
        </div>
      </q-form>
      <q-separator color="primary" class="q-mt-sm" inset />
      <div class=" text-center q-mt-sm column">
        <q-item-label caption>or Register with</q-item-label>
      </div>
      <div class="q-mt-sm text-center row">
        <q-btn
          @click="signUpWithFacebook"
          style="width: 130px"
          rounded
          outline
          icon="facebook"
          class=" facebook"
          >Facebook</q-btn
        >
        <q-space></q-space>
        <q-btn
          @click="signUpWithGoogle"
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
        <q-item-label caption class="text-teal"
          >already have account?</q-item-label
        >
      </div>
      <div class="text-center text-grey-8 q-mt-xs ">
        <q-btn
          @click="showLogin"
          flat
          rounded
          style="width: 150px"
          label="SIGN IN HERE"
        ></q-btn>
      </div>
    </q-card-section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { fb } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";
export default {
  data() {
    return {
      isPwd: true,
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      },
      registerModal: false
    };
  },
  methods: {
    ...mapActions("auth", ["registerUser", "loginGmail"]),
    showRegister() {
      this.registerModal = true;
    },
    showLogin() {
      this.$emit("openLoginDialog");
    },
    register() {
      this.registerUser(this.formData);
    },
    isValidEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    isValidPassword(password) {
      var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      return regularExpression.test(password);
    },
    signUpWithFacebook() {
      console.log("Sign In");
    },
    signUpWithGoogle() {
      this.loginGmail();
    }
  }
};
</script>

<style></style>
