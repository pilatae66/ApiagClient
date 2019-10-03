<template>
    <v-card
        width="100vw"
    >
        <v-toolbar
            color="light-blue"
            dark
            >
        <v-toolbar-title>Payment Form</v-toolbar-title>
        </v-toolbar>
        <v-container>
            <v-row>
                <v-col cols="6">
                    <v-autocomplete
                        v-model="selectedCustomer"
                        :items="customers"
                        label="Search Customer..."
                        item-value="id"
                        :filter="filterCustomer"
                        hide-no-data
                        >
                        <template v-slot:selection="data">
                            ID: {{ data.item.id }} / Name: {{ data.item.name }} / Address: {{ data.item.address.permanent_address }}
                        </template>
                        <template v-slot:item="data">
                            <template v-if="typeof data.item !== 'object'">
                                <v-list-item-content v-text="data.item"></v-list-item-content>
                            </template>
                            <template v-else>
                            <v-list-item-content>
                                <v-row>
                                    <v-col>
                                        <v-list-item-title v-text="`Customer ID: ${data.item.id}`"></v-list-item-title>
                                    </v-col>
                                    <v-col>
                                        <v-list-item-title v-text="`Name: ${data.item.name}`"></v-list-item-title>
                                    </v-col>
                                    <v-col>
                                        <v-list-item-title v-text="`Address : ${data.item.address.permanent_address}`"></v-list-item-title>
                                    </v-col>
                                </v-row>
                            </v-list-item-content>
                            </template>
                        </template>
                    </v-autocomplete>
                </v-col>
                <v-col cols="6">
                    <v-autocomplete
                        v-model="selectedPurchase"
                        :items="customer_purchase"
                        label="Search Purchase..."
                        :filter="filterPurchase"
                        hide-no-data
                        v-if="customer_purchase"
                        >
                         <template v-slot:selection="data">
                            {{ data.item.product.brand }} {{ data.item.product.model }}
                        </template>
                        <template v-slot:item="data">
                            <template v-if="typeof data.item !== 'object'">
                                <v-list-item-content v-text="data.item"></v-list-item-content>
                            </template>
                            <template v-else>
                            <v-list-item-content>
                                <v-row>
                                    <v-col>
                                        <v-list-item-title v-text="`${data.item.product.brand} ${data.item.product.model}`"></v-list-item-title>
                                        <v-list-item-subtitle v-html="data.item.product.color"></v-list-item-subtitle>
                                    </v-col>
                                    <v-col>
                                        <v-list-item-title v-text="`Type: ${data.item.product.type}`"></v-list-item-title>
                                    </v-col>
                                </v-row>
                            </v-list-item-content>
                            </template>
                        </template>
                    </v-autocomplete>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    Monthly Amortization: {{ selectedPurchase != null ? `P${selectedPurchase.monthly_amortization}` : ''}}
                </v-col>
                <v-col>
                    Amount Due: {{ selectedPurchase != null ? `P${selectedPurchase.amount_due}` : ''}}
                </v-col>
            </v-row>
            <v-row align="center">
                <v-col>
                    <v-checkbox
                        v-model="early"
                        :label="`Early Payment`"
                    ></v-checkbox>
                </v-col>
                <v-col>
                    <v-checkbox
                        v-model="late"
                        :label="`Late Payment`"
                    ></v-checkbox>
                </v-col>
                <v-col>
                    {{ `Last Payment Date: 2019-10-02` }}
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                        placeholder="Amount"
                        v-model="amount"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-card-actions>
                <v-btn block @click="save" color="green" dark :loading="loading">Save</v-btn>
            </v-card-actions>
        </v-container>
    </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    data:() => ({
        selectedCustomer: null,
        selectedPurchase: null,
        amount: null,
        early: false,
        late:false,
        five_percent: null
    }),
    created(){
        this.customerInit()
    },
    computed:{
        ...mapState({
            customers: state => state.customers.customers,
            customer_purchase: state => state.customer_purchase,
            loading: 'loading',
            auth_user: state => state.user.auth_user
        })
    },
    methods:{
        ...mapActions([
            'customerInit',
            'getCustomerPurchase',
            'addBranchPayment'
        ]),
        filterCustomer(item, queryText, itemText) {
            const name = item.name.toLowerCase()
            const id = item.id
            const permanent_address = item.address.permanent_address.toLowerCase()
            const present_address = item.address.present_address.toLowerCase()
            const searchText = queryText.toLowerCase()

            return name.indexOf(searchText) > -1 
                || id == searchText
                || permanent_address.indexOf(searchText) > -1
                || present_address.indexOf(searchText) > -1
        },
        filterPurchase(item, queryText, itemText){
            const name = item.name.toLowerCase()
            const id = item.id
            const permanent_address = item.address.permanent_address.toLowerCase()
            const present_address = item.address.present_address.toLowerCase()
            const searchText = queryText.toLowerCase()

            return name.indexOf(searchText) > -1 
                || id == searchText
                || permanent_address.indexOf(searchText) > -1
                || present_address.indexOf(searchText) > -1
        },
        save(){
            let remarks = null
            if(this.early == true){
                remarks = 'Early Payment'
            }
            else if(this.late == true){
                remarks = "Late Payment"
            }
            else{
                remarks = "Payment within the grace period"
            }
            
            let data = {
                product_id: this.selectedPurchase.id,
                amount_due: this.selectedPurchase.amount_due - this.amount,
                pay:{
                    amount: this.amount,
                    payment_type: 'Branch',
                    paid_to: this.auth_user.id,
                    remarks: remarks,
                    purchased_product_id: this.selectedPurchase.id,
                    user_id: this.selectedCustomer
                }
            }
            this.addBranchPayment(data)
        }
    },
    watch:{
        selectedCustomer(newValue, oldValue){
            if(newValue != oldValue){
                this.getCustomerPurchase(newValue)
            }
        },
        selectedPurchase(newValue, oldValue){
            this.five_percent = this.selectedPurchase.monthly_amortization * 0.05
            
        },
        early(newValue, oldValue){
            if (newValue == true) {
                this.selectedPurchase.monthly_amortization -= 200
                this.selectedPurchase.amount_due -= 200
            }
            else{
                this.selectedPurchase.monthly_amortization += 200
                this.selectedPurchase.amount_due += 200
            }
            if(newValue == this.late && newValue != false){
                this.late = !this.late
            }
        },
        late(newValue, oldValue){
            if (newValue == true) {
                this.selectedPurchase.monthly_amortization += this.five_percent
                this.selectedPurchase.amount_due += this.five_percent
            }
            else{
                this.selectedPurchase.monthly_amortization -= this.five_percent
                this.selectedPurchase.amount_due -= this.five_percent
            }
        }
    }
}
</script>