<template>
  <v-data-table
    :headers="headers"
    :items="roles"
    sort-by="date_registered"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Role List</v-toolbar-title>
        <v-divider
          class="mx-4 mt-3"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Role</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Role Name"
                      :error-messages="error.type"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click.native="save" :loading="loading">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <p>No Data</p>
    </template>
  </v-data-table>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Role Name',
          align: 'left',
          sortable: false,
          value: 'name',
          width: 500
        },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: ''
      },
      defaultItem: {
        name: ''
      },
    }),

    computed: {
      ...mapState({
        roles: state => state.roles.roles,
        error: state => state.roles.errors,
        loading: 'loading'
      }),
      formTitle () {
        return this.editedIndex === -1 ? 'New Role' : 'Edit Role'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      loading(newValue, oldValue){
        if (newValue == false) {
          this.dialog = false
        }
      }
    },

    created () {
      this.roleInit()      
    },
    methods: {
      ...mapActions([
        'roleInit',
        'roleStore',
        'roleUpdate',
        'roleDestroy'
      ]),
      editItem (item) {
        this.editedIndex = this.roles.indexOf(item)
        this.editedItem.id = item.id
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        let data = {
          index: this.roles.indexOf(item),
          id: item.id
        }
        this.roleDestroy(data)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.editedItem.id = ''
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          let data = {
            id: this.editedItem.id,
            name: this.editedItem.name,
            index: this.editedIndex
          }
          this.roleUpdate(data)
        } else {
          let data = {
            name: this.editedItem.name
          }
          this.roleStore(data)
        }
      },
    },
  }
</script>
