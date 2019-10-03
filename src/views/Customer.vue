<template>
  <v-data-table
    :headers="headers"
    :items="customers"
    sort-by="date_registered"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Customer List</v-toolbar-title>
        <v-divider
          class="mx-4 mt-3"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" :to="{ name: 'customercreate'}">New Customer</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.firstname" label="Firstname" :error-messages="error.firstname"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.middlename" label="Middlename" :error-messages="error.middlename"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.lastname" label="Lastname" :error-messages="error.lastname"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.username" label="Username" :error-messages="error.username"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="editedIndex == -1">
                    <v-text-field v-model="editedItem.password" label="Password" :error-messages="error.password"></v-text-field>
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
        @click="addPurchase(item)"
      >
        add
      </v-icon>
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        class="mr-2"
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
  import router from '../router'
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name',
          width: 500
        },
        { text: 'E-mail', value: 'details.email', width: 500 },
        { text: 'Mobile Number', value: 'details.mobile_number', width: 500 },
        { text: 'Landline Number', value: 'details.landline_number', width: 500 },
        { text: 'Address', value: 'address.permanent_address', width: 500 },
        { text: 'Actions', value: 'action', width:200, sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        firstname: '',
        middlename: '',
        lastname: '',
        username:'',
        password:''
      },
      defaultItem: {
        id: '',
        firstname: '',
        middlename: '',
        lastname: '',
        username:'',
        password:''
      },
    }),

    computed: {
      ...mapState({
        customers: state => state.customers.customers,
        error: state => state.products.errors,
        loading: 'loading'
      }),
      formTitle () {
        return this.editedIndex === -1 ? 'New Admin' : 'Edit Admin'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      loading(newValue){
        if (newValue == false) {
          this.dialog = false
        }
      }
    },

    created () {
      this.customerInit()  
    },
    methods: {
      ...mapActions([
        'customerInit',
        'customerStore',
        'customerUpdate',
        'customerDestroy',
      ]),
      editItem (item) {
        this.editedIndex = this.customers.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.editedItem.role_id = parseInt(this.editedItem.role_id)
        this.dialog = true              
      },
      addPurchase(item){
        router.push({ path: `/purchase/${item.id}` })
      },
      deleteItem (item) {
        let data = {
          index: this.customers.indexOf(item),
          id: item.id
        }
        this.customerDestroy(data)
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
            firstname: this.editedItem.firstname,
            middlename: this.editedItem.middlename,
            lastname: this.editedItem.lastname,
            role: this.editedItem.role,
            role_id: this.editedItem.role_id,
            username: this.editedItem.username,
            password: this.editedItem.password,
            index: this.editedIndex
          }
          this.userUpdate(data)
        } else {
          let data = {
            firstname: this.editedItem.firstname,
            middlename: this.editedItem.middlename,
            lastname: this.editedItem.lastname,
            role: this.editedItem.role_id,
            username: this.editedItem.username,
            password: this.editedItem.password,
          }
          this.customerStore(data)
        }
      },
    },
  }
</script>
