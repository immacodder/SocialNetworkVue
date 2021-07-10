<template>
  <v-container style="height:100vh;">
    <v-row style="height:100%;" align="center">
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-form @submit.prevent>
          <v-card class="pa-4">
            <v-textarea label="Your bio" outlined></v-textarea>
          </v-card>
        </v-form>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  data: () => ({})
}
</script>
