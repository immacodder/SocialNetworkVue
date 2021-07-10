<template>
  <v-container>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-card elevation="12">
          <v-window vertical v-model="current">
            <v-window-item v-for="n in lng" :key="n">
              <v-card-title class="text-h1 justify-center"
                >Slide {{ n }}</v-card-title
              >
            </v-window-item>
          </v-window>
          <v-card-actions>
            <v-btn @click="prev">Prev</v-btn>
            <v-btn @click="next">Next</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
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
