<template>
  <v-app id="inspire">

    <v-app-bar
      app
      clipped-right
      color="#3474eb"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="this.loggedIn"></v-app-bar-nav-icon>
      <v-toolbar-title>Transcycle Debtor Locator System</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn depressed v-if="!this.loggedIn" color="blue" @click="dialog = !dialog">Login</v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      app
      dark
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      
      <v-list-item
        v-for="item in items"
        :key="item.title"
        router
        :to="item.to"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
        </v-list-item>
        <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="logout_user">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          justify-center
          align-center
        >
          <v-flex shrink>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer
      app
      color="#1f2d54"
      class="white--text"
    >
      <span>LonerDev</span>
      <v-spacer></v-spacer>
      <span>&copy; 2019</span>
    </v-footer>
    <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="red lighten-2"
          dark
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline"
          primary-title
        >
          Login
        </v-card-title>

        <v-card-text>
          <Login v-on:login="dialog = false"/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
  </v-app>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import Login from "./views/Login";
  export default {
    components:{ Login },
    props: {
      source: String,
    },
    data: () => ({
      drawer: false,
      dialog: false,
      left: false,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', to:'dashboard' },
        { title: 'Customer', icon: 'mdi-face', to: 'customer' },
        { title: 'Admin', icon: 'perm_identity', to: 'admin' },
        { title: 'Role', icon: 'perm_identity', to: 'role' },
        { title: 'Products', icon: 'motorcycle', to: 'products' },
      ],
    }),
    computed:{
      ...mapState({
        loggedIn: state => state.appState.loggedIn
      })
    },
    methods:{
      ...mapActions([
        'logout'
      ]),
      logout_user(){
        this.drawer = false
        this.logout()
      }
    }
  }
</script>