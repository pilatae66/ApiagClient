<template>
  <v-app id="inspire">

    <v-app-bar
      app
      clipped-right
      color="#3474eb"
      dark
    >
      <v-toolbar-title>Transcycle Debtor Locator System</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn depressed v-if="!this.loggedIn" color="blue" @click="dialog = !dialog">Login</v-btn>
    </v-app-bar>

    <v-navigation-drawer
      :value="drawer"
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
      app
      dark
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ this.auth_user.full_name }}</v-list-item-title>
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

    <div v-if="notification" class="notification">
      <p>{{ this.message }}</p>
      <button v-if="close_button" @click="closeNotification()">
        Close
      </button>
      <button v-if="restart_button" @click="restartApp()">
        Restart
      </button>
    </div>

    <v-footer
      app
      color="#1f2d54"
      class="white--text"
    >
      <span>{{ this.version }}</span>
      <v-spacer></v-spacer>
      <span>LonerDev &copy; 2019</span>
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
          <Login />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
  </v-app>
</template>

<script>
  import { mapState, mapActions } from "vuex"
  import Login from "./views/Login"
  import { ipcRenderer } from 'electron'

  export default {
    components:{ Login },
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      left: false,
      version: "",
      notification: false,
      message: "",
      close_button: false,
      restart_button: false,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', to:'dashboard' },
        { title: 'Customer', icon: 'mdi-face', to: 'customer' },
        { title: 'Admin', icon: 'perm_identity', to: 'admin' },
        { title: 'Role', icon: 'perm_identity', to: 'role' },
        { title: 'Products', icon: 'motorcycle', to: 'products' },
      ],
    }),
    created(){
      ipcRenderer.send('app_version')
      ipcRenderer.on('app_version', (event, arg) => {
        ipcRenderer.removeAllListeners('app_version')
        this.version = 'Version ' + arg.version
      });

      ipcRenderer.on('update_available', () => {
        ipcRenderer.removeAllListeners('update_available');
        this.message = 'A new update is available. Downloading now...';
        this.notification = true;
      });
      ipcRenderer.on('update_downloaded', () => {
        ipcRenderer.removeAllListeners('update_downloaded');
        this.message = 'Update Downloaded. It will be installed on restart. Restart now?';
        this.restart_button = true;
        this.notification = true;
      });
    },
    computed:{
      ...mapState({
        loggedIn: state => state.appState.loggedIn,
        auth_user: state => state.user.auth_user,
        loading: state => state.loading,
        drawer: state => state.drawer
      })
    },
    methods:{
      ...mapActions([
        'logout'
      ]),
      logout_user(){
        this.drawer = false
        this.logout()
      },
      closeNotification() {
        this.notification = false;
      },
      restartApp() {
        ipcRenderer.send('restart_app');
      }
    },
    watch:{
      loading(newValue, oldValue){
        if (newValue == false) {
          this.dialog = false
        }
      }
    }
  }
</script>
<style scoped>
.notification {
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 200px;
  padding: 20px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
</style>