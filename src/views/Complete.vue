<template>
  <v-container v-if="user" style="height:100vh;">
    <v-row style="height:100%;" align="center">
      <v-spacer></v-spacer>
      <v-col cols="12" xl="4">
        <v-form ref="formComplete" @submit.prevent="onFormSubmit">
          <v-card class="pa-4">
            <v-card-title>Complete information</v-card-title>
            <v-card-text>
              <div class="pb-4">
                <span class="text-subtitle-1">Date of birth: </span>
                <v-date-picker landscape v-model="picker" elevation="4"></v-date-picker>
              </div>
              <v-textarea
                v-model="bio"
                counter
                label="Tell about yourself (optional)"
                clearable
                :rules="[rules.isTooLong]"
                no-resize
                rows="4"
              ></v-textarea>
              <v-file-input
                v-model="image"
                label="Avatar (optional)"
                accept="image/*"
                show-size
                prepend-icon="mdi-camera"
                truncate-length="25"
              ></v-file-input>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" class="ml-2" type="submit">Complete information</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
  <spinner-vue v-else-if="user === null"></spinner-vue>
</template>

<script lang="ts">
import Vue from 'vue'
import { formatISO } from 'date-fns'
import { mapGetters, mapState } from 'vuex'
import { firebase } from '../main'
import imageCompression from 'browser-image-compression'
import { fromBuffer } from 'file-type'
import { userInDB } from '../types'
import spinnerVue from '../components/spinner.vue'

export default Vue.extend({
  data: () => ({
    picker: formatISO(new Date(), { representation: 'date' }),
    image: null as File | null,
    bio: '',
    rules: {
      isTooLong: (v: string) => v.length <= 240 || `The text is too long`,
    },
  }),
  components: { spinnerVue },
  computed: { ...mapState(['password', 'email', 'user']), ...mapGetters(['uid']) },
  methods: {
    async onFormSubmit() {
      console.log(!(<any>this.$refs.formComplete).validate())
      if (!(<any>this.$refs.formComplete).validate()) return

      let ref: firebase.storage.Reference | undefined
      let noAvatarRefUrl = await firebase
        .storage()
        .ref('avatars/account-circle.svg')
        .getDownloadURL()

      if (this.image) {
        let image: File = this.image

        if (this.image.size * 1024 < 250)
          image = await imageCompression(this.image, { maxSizeMB: 1 / 4 })
        ref = firebase
          .storage()
          .ref()
          .child(`avatars/${this.uid}.${(await fromBuffer(await image.arrayBuffer()))!.ext}`)
        await ref.put(image)
      }

      await (this.user as firebase.User).updateProfile({
        photoURL: ref ? await ref.getDownloadURL() : noAvatarRefUrl,
      })
      console.log('Hello there')
      await firebase
        .firestore()
        .doc(`users/${this.uid}`)
        .set({
          bio: this.bio,
          dateOfBirth: new Date(this.picker).getTime(),
        } as userInDB)
    },
  },
})
</script>
