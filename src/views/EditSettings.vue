<template>
<v-card>
    <v-toolbar
        color="light-blue"
        dark
        width="500px"
        >
        <v-toolbar-title>Edit Branch Settings</v-toolbar-title>
    </v-toolbar>
    <v-container>
        <v-row>
            <v-col>
                <v-select
                    :items="items"
                    label="Branch Locations"
                    item-text="branch_name"
                    :item-value="setBranch"
                >
                </v-select>
            </v-col>
        </v-row>
    </v-container>
    <v-card-actions>
        <v-btn block @click="save" color="green" dark :loading="loading">Save</v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data: () => ({
        branch:{},
        items: [
            {
                branch_name: 'Iligan',
                branch_code: 'ILI-01'
            },
            {
                branch_name: 'Ozamis',
                branch_code: 'OZS-01'
            },
            {
                branch_name: 'Cagayan de Oro',
                branch_code: 'CDO-01'
            }
        ]
    }),
    methods:{
        ...mapActions([
            'settingsUpdate'
        ]),
        save(){
            let data = {
                new_branch: this.branch,
                old_branch: this.$route.params.setting
            }
            this.settingsUpdate(data)
        },
        setBranch(item){
            this.branch = item
        }
    },
    computed:{
        ...mapState([
            'loading'
        ])
    }
}
</script>