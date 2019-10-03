<template>
  <v-card
    class="mx-auto"
    width="100vw"
    tile
  >
     <v-toolbar
      color="blue"
      dark
      >
      <v-toolbar-title>Payment List</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>
    <v-list-item v-for="payment in payments" :key="payment.id">
      <v-list-item-content>
        <v-row>
          <v-col cols="1">
            <v-list-item-title v-text="`OR#${payment.id}`"></v-list-item-title>
          </v-col>
          <v-col>
            <v-list-item-title v-text="`Customer: ${payment.customer.firstname} ${payment.customer.middlename[0]}. ${payment.customer.lastname}`"></v-list-item-title>
          </v-col>
          <v-col>
            <v-list-item-title v-text="`Pay Type: ${payment.payment_type}`"></v-list-item-title>
          </v-col>
          <v-col>
            <v-list-item-title v-text="`Branch: ${payment.branch.branch_name}`"></v-list-item-title>
          </v-col>
          <v-col>
            <v-list-item-title v-text="`Amount: P${payment.amount}`"></v-list-item-title>
          </v-col>
          <v-col>
            <v-list-item-title v-text="`Amount Due: P${payment.purchased_product.amount_due}`"></v-list-item-title>
          </v-col>
          <v-col>
            <v-list-item-title v-text="`Remarks: ${payment.remarks}`"></v-list-item-title>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
  </v-card>
  
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  created(){
    this.paymentsInit()   
  },
  computed:{
    ...mapState({
      payments: 'payments'
    })
  },
  methods:{
    ...mapActions([
      'paymentsInit'
    ])
  }
}
</script>