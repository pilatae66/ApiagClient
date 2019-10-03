<template>
  <div>
      <v-card
        width="500px"
        class="mx-auto"
    >
        <v-toolbar
        color="light-blue"
        dark
        >
        <v-toolbar-title>Branch Settings</v-toolbar-title>
        </v-toolbar>
        <v-list-item
        >
            <v-list-item-content>
            <v-list-item-title>Branch Location</v-list-item-title>
            <v-list-item-subtitle v-text="settings.branch_name"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-content>
            <v-list-item-title>Branch Code</v-list-item-title>
            <v-list-item-subtitle v-text="settings.branch_code"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
            <v-btn icon @click="updateSettings(settings)">
                <v-icon color="blue lighten-1">mdi-circle-edit-outline</v-icon>
            </v-btn>
            </v-list-item-action>
        </v-list-item>
        </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '../router'
export default {
    created(){
        this.settingsInit()
    },
    computed:{
        ...mapState({
            settings: state => state.settings
        })
    },
    methods:{
        ...mapActions([
            'settingsInit'
        ]),
        updateSettings(setting){
            router.push({ name:'editSettings', params:{ setting: setting } })
        },  
    }
}
</script>