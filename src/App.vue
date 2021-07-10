<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { firebase } from './main'
import { mapMutations } from 'vuex'
import Vue from 'vue'

export default Vue.extend({
  created() {
    firebase.auth().onAuthStateChanged(user => this.setUser(user))
    firebase
      .auth()
      .getRedirectResult()
      .then(user => {
        if (!user.user) return
        this.$store.commit('setUser', user)
        this.$router.push('/')
      })
  },
  methods: { ...mapMutations(['setUser']) }
})
</script>
