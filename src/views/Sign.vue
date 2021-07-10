<template>
  <v-container>
    <v-row style="height: 100vh" align="center">
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-form ref="form" @submit.prevent="sign(str)">
          <v-card class="pa-8">
            <v-card-title class="justify-center">{{ str }}</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="email"
                :rules="[rules.isEmpty, rules.isEmail]"
                label="Email"
                append-icon="mdi-email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                :rules="[rules.isEmpty, rules.isLongEnough]"
                :append-icon="!show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
              ></v-text-field>
              <v-text-field
                v-if="!isLogin"
                v-model="passwordRepeat"
                label="Repeat password"
                :rules="[rules.isEmpty, rules.isLongEnough, rules.isTheSame]"
                :type="show2 ? 'text' : 'password'"
                :append-icon="!show2 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show2 = !show2"
              ></v-text-field>
            </v-card-text>
            <div
              class="d-flex justify-center flex-column align-center text-center"
              style="width: 100%"
            >
              <v-btn color="primary" class="button" type="submit">{{
                str
              }}</v-btn>
              <v-btn
                color="secondary"
                class="button"
                @click="$store.state.uid ? linkWithGoogle() : signWithGoogle()"
                >{{ str }} with Google
                <v-icon class="ml-2">mdi-google</v-icon></v-btn
              >
              <v-btn
                text
                color="secondary"
                class="button"
                @click="$router.push(!isLogin ? '/login' : '/signup')"
                >{{ isLogin ? 'Sign Up' : 'Login' }} instead</v-btn
              >
            </div>
          </v-card>
        </v-form>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.button {
  margin: 0.3rem 0;
}
</style>

<script lang="ts">
import { firebase } from '../main'
import Vue from 'vue'
let password = ''

export default Vue.extend({
  data: () => ({
    show1: false,
    show2: false,
    email: '',
    password: '',
    passwordRepeat: '',
    rules: {
      isEmpty: (v: string) => !!v || 'This field is required',
      isLongEnough: (v: string) =>
        v.length > 8
          ? true
          : 'The password is required to be at least 8 characters',
      isTheSame: (v: string) =>
        v === password
          ? true
          : 'Please make sure that the passwords are the same',
      isEmail: (v: string) =>
        v.includes('@') || 'Make sure to enter valid email',
    },
  }),
  watch: {
    password: (v) => (password = v),
  },
  computed: {
    str() {
      return this.isLogin ? 'Login' : 'Sign Up'
    },
  },
  props: {
    isLogin: {
      required: true,
      type: Boolean,
    },
  },
  methods: {
    sign(type: 'Login' | 'Sign Up') {
      if ((this.$refs.form as any).validate()) {
        if (!this.$store.getters.uid) {
          firebase
            .auth()
            [
              type === 'Login'
                ? 'signInWithEmailAndPassword'
                : 'createUserWithEmailAndPassword'
            ](this.email, this.password)
        } else {
          this.link()
        }
      }
    },
    signWithGoogle() {
      firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider())
    },
    linkWithGoogle() {
      ;(this.$store.state.user as firebase.User).linkWithRedirect(
        new firebase.auth.GoogleAuthProvider()
      )
    },
    link() {
      ;(this.$store.state.user as firebase.User).linkWithCredential(
        firebase.auth.EmailAuthProvider.credential(this.email, this.password)
      )
    },
  },
})
</script>
