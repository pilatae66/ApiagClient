<template>
  <v-data-table
    :headers="headers"
    :items="products"
    sort-by="date_registered"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Products List</v-toolbar-title>
        <v-divider
          class="mx-4 mt-3"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Product</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedItem.type"
                      label="Product Type"
                      :items="typeItems"
                      :error-messages="error.type"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.brand" label="Product Brand" :error-messages="error.brand"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.model" label="Product Model" :error-messages="error.model"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.color" label="Product Color" :error-messages="error.color"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.price" label="Product Price"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.quantity" label="Product Quantity"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field v-model="editedItem.downpayment" label="Product Downpayment"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                     <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="editedItem.purchased_date"
                      persistent
                      full-width
                      width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem.purchased_date"
                          label="Purchased Date"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedItem.purchased_date" type="date" scrollable>
                        <div class="flex-grow-1"></div>
                        <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.dialog.save(editedItem.purchased_date)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
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
      modal: false,
      typeItems: [
        'REPO', 'NEW'
      ],
      headers: [
        {
          text: 'Type',
          align: 'left',
          sortable: false,
          value: 'type',
          width: 170
        },
        { text: 'Brand', value: 'brand', width: 170 },
        { text: 'Model', value: 'model', width: 170 },
        { text: 'Color', value: 'color', width: 170 },
        { text: 'Price', value: 'price', width: 170 },
        { text: 'Quantity', value: 'quantity', width: 170 },
        { text: 'Downpayment', value: 'downpayment', width: 170 },
        { text: 'Date Registered', value: 'date_registered', width: 170 },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        type: '',
        brand: '',
        model: '',
        color: '',
        price: '',
        quantity: '',
        downpayment: '',
        purchased_date:''
      },
      defaultItem: {
        id: '',
        type: '',
        brand: '',
        model: '',
        color: '',
        price: '',
        quantity: '',
        downpayment: '',
        purchased_date:''
      },
    }),

    computed: {
      ...mapState({
        products: state => state.products.products,
        error: state => state.products.errors,
        loading: 'loading'
      }),
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
      this.productInit()      
    },
    methods: {
      ...mapActions([
        'productInit',
        'productStore',
        'productUpdate',
        'productDestroy'
      ]),
      editItem (item) {
        this.editedIndex = this.products.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        let data = {
          index: this.products.indexOf(item),
          id: item.id
        }
        this.productDestroy(data)
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
            type: this.editedItem.type,
            brand: this.editedItem.brand,
            model: this.editedItem.model,
            color: this.editedItem.color,
            price: this.editedItem.price,
            quantity: this.editedItem.quantity,
            downpayment: this.editedItem.downpayment,
            purchased_date: this.editedItem.purchased_date,
            index: this.editedIndex
          }
          this.productUpdate(data)
        } else {
          let data = {
            id: this.editedItem.id,
            type: this.editedItem.type,
            brand: this.editedItem.brand,
            model: this.editedItem.model,
            color: this.editedItem.color,
            price: this.editedItem.price,
            quantity: this.editedItem.quantity,
            downpayment: this.editedItem.downpayment,
            purchased_date: this.editedItem.purchased_date,
          }
          this.productStore(data)
        }
      },
    },
  }
</script>
