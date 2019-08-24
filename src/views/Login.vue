<template>
  <form>
    <v-text-field
      v-model="username"
      v-validate="'required'"
      :counter="10"
      :error-messages="errors.collect('username')"
      label="Username"
      data-vv-name="username"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      v-validate="'required'"
      :error-messages="errors.collect('password')"
      label="Password"
      data-vv-name="password"
      required
      @keydown.enter="submit"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-btn :loading="loading" class="mr-4 white--text" @click="submit" color="blue">submit</v-btn>
    <v-btn color="red white--text" class="" @click="clear">clear</v-btn>
  </form>
</template>
<script>
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'
  import { mapActions } from "vuex";

  Vue.use(VeeValidate)

  export default {
    $_veeValidate: {
      validator: 'new',
    },

    data: () => ({
      username: '',
      password: '',
      loading: false,
      dictionary: {
        custom: {
          username: {
            required: () => 'Username can not be empty',
            // custom messages
          },
          password: {
            required: () => 'Password can not be empty',
            // custom messages
          }
        },
      },
    }),

    mounted () {
      this.$validator.localize('en', this.dictionary)
    },

    methods: {
      ...mapActions([
        'login'
      ]),
      submit () {        
        if (this.$validator.validateAll()) {
          this.loading = true
          setTimeout(() => {
            let data = {
              username: this.username,
              password: this.password
            }
            this.login(data)
            this.username = ""
            this.password = ""
            this.$emit('login')
          }, 1000)
          this.loading = false
        }
      },
      clear () {
        this.username = ''
        this.password = ''
        this.$validator.reset()
      },
    },
  }
</script>