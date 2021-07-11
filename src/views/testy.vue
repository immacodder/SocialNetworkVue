<template>
  <v-container
    class="d-flex justify-center align-center text-center"
    style="height:100vh;width:100vw;"
  >
    <v-progress-circular indeterminate color="secondary"></v-progress-circular>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      lng: 3,
      current: 0,
    }
  },
  methods: {
    prev() {
      this.current !== -1 && this.current--
    },
    next() {
      this.current < this.lng - 1 && this.current++
    },
  },
})
</script>
