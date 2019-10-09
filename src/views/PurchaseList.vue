<template>
  <v-data-table
    :headers="headers"
    :items="purchasedProducts"
    sort-by="date_registered"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Purchased Product List</v-toolbar-title>
        <v-divider
          class="mx-4 mt-3"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
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
          text: 'Purchase No.',
          align: 'left',
          sortable: false,
          value: 'id',
          width: 500
        },
        { text: 'Product', value: 'product_name', width: 500 },
        { text: 'Amount Financed', value: 'amount_finance', width: 500 },
        { text: 'Amount Due', value: 'amount_due', width: 500 },
        { text: 'Monthly Payment', value: 'monthly_amortization', width: 500 },
        { text: 'Due Date', value: 'due_date', width: 500 },
        { text: 'Sales Agent', value: 'sales_agent', width: 500 },
        { text: 'Actions', value: 'action', width:200, sortable: false }
      ],
    }),

    computed: {
      ...mapState({
        purchasedProducts: state => state.purchasedProducts,
        loading: 'loading'
      })
    },

    watch: {
      loading(newValue){
        if (newValue == false) {
          this.dialog = false
        }
      }
    },

    created () {
      this.purchasedProductsInit()  
    },
    methods: {
      ...mapActions([
        'purchasedProductsInit',
        'purchasedProductsUpdate',
        'purchasedProductsDestroy',
      ]),
      editItem (item) {
        router.push({ name: 'purchasedit', params:{ item } })             
      },
      deleteItem (item) {
        let data = {
          index: this.purchasedProducts.indexOf(item),
          id: item.id
        }
        this.purchasedProductsDestroy(data)
      },
    },
  }
</script>
