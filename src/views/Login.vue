<template>
  <form>
    <v-text-field
      autofocus
      v-model="username"
      v-validate="'required'"
      :counter="10"
      :error-messages="errors.collect('username')"
      label="Username"
      data-vv-name="username"
      required
      :loading="loading"
    ></v-text-field>
    <v-text-field
      v-model="password"
      v-validate="'required'"
      :error-messages="errors.collect('password')"
      label="Password"
      data-vv-name="password"
      required
      type="password"
      :loading="loading"
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
  import { mapActions, mapState } from "vuex";

  Vue.use(VeeValidate)

  export default {
    $_veeValidate: {
      validator: 'new',
    },

    data: () => ({
      username: '',
      password: '',
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
    computed:{
      ...mapState([
        'loading'
      ])
    },
    methods: {
      ...mapActions([
        'login'
      ]),
      submit () {        
        if (this.$validator.validateAll()) {
          setTimeout(() => {
            let data = {
              username: this.username,
              password: this.password
            }
            this.login(data)
          }, 1000)
        }
      },
      clear () {
        this.username = ''
        this.password = ''
        this.$validator.reset()
      },
    },
    watch:{
      loading(newValue, oldValue){
        if (newValue == false) this.clear()
      }
    }
  }
</script>