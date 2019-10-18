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
            <v-row v-show="customers != null">
                <v-col>
                    <v-autocomplete
                        v-model="selectedCustomer"
                        :items="customers"
                        label="Search Customer..."
                        item-value="id"
                        :filter="filterCustomer"
                        hide-no-data
                        >
                        <template v-slot:selection="data">
                            ID: {{ data.item.id }} / Name: {{ data.item.full_name }} / Address: {{ data.item.address.permanent_address }}
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
                                        <v-list-item-title v-text="`Name: ${data.item.full_name}`"></v-list-item-title>
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
            </v-row>
            <div v-show="customer_purchase != null">
                <span class="title font-weight-light">Purchase Information</span>
                <v-row>
                    <v-col>
                        Purchase #{{ customer_purchase != null ? `${customer_purchase.id}` : '' }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        Product Purchased: {{ customer_purchase != null ? `${customer_purchase.product.brand} ${customer_purchase.product.model}` : ''}}
                    </v-col>
                    <v-col>
                        Color: {{ customer_purchase != null ? `${customer_purchase.product.color}` : ''}}
                    </v-col>
                </v-row><br>
                <span class="title font-weight-light">Payment Information</span>
                <v-row>
                    <v-col>
                        Monthly Amortization: {{ customer_purchase != null ? `₱ ${monthly_amortization}` : ''}}
                    </v-col>
                    <v-col>
                        Amount Due: {{ customer_purchase != null ? `₱ ${amount_due}` : ''}}
                    </v-col>
                    <v-col>
                        Total Amount Paid: {{ customer_purchase != null ? `₱ ${customer_purchase.total_payment}` : ''}}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        Due Date: {{ customer_purchase != null ? `${customer_purchase.due_date}` : ''}}
                    </v-col>
                    <v-col style="margin-left:-322px;" v-show="penaltyType != ''">
                        {{ penaltyType }}: ₱ {{ penalty }}
                    </v-col>
                </v-row><br>
                <span class="title font-weight-light">Penalty Options</span>
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
                </v-row>
            </div>
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
        amount: null,
        early: false,
        late:false,
        five_percent: null,
        penalty: 0,
        penaltyType:"",
        monthly_amortization: 0,
        amount_due: 0
    }),
    created(){
        this.getCustomersWithPurchase()
    },
    computed:{
        ...mapState({
            customers: state => state.customers_with_purchase,
            customer_purchase: state => state.customer_purchase,
            loading: 'loading',
            auth_user: state => state.user.auth_user
        })
    },
    methods:{
        ...mapActions([
            'getCustomersWithPurchase',
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
                product_id: this.customer_purchase.id,
                amount_due: this.customer_purchase.amount_due - this.amount,
                pay:{
                    amount: Number(this.amount) + Number(this.penalty),
                    payment_type: 'Branch',
                    paid_to: this.auth_user.id,
                    remarks: remarks,
                    purchased_product_id: this.customer_purchase.id,
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
        customer_purchase(newValue, oldValue){
            if (newValue != oldValue) {
                this.five_percent = Number(this.customer_purchase.monthly_amortization.replace(/[^0-9.-]+/g,"")) * 0.05
                this.monthly_amortization = Number(this.customer_purchase.monthly_amortization.replace(/[^0-9.-]+/g,""))
                this.amount_due = Number(this.customer_purchase.amount_due.replace(/[^0-9.-]+/g,""))
            }
        },
        early(newValue, oldValue){
            if (newValue == true) {
                this.monthly_amortization -= 200
                this.amount_due -= 200
                this.penalty = 200
                this.penaltyType = "Rebates"
            }
            else{
                this.monthly_amortization += 200
                this.amount_due += 200
                this.penalty = 0
                this.penaltyType = ""
            }
        },
        late(newValue, oldValue){
            if (newValue == true) {
                this.monthly_amortization += this.five_percent
                this.amount_due += this.five_percent
                this.penalty = this.five_percent
                this.penaltyType = "Penalty"
            }
            else{
                this.monthly_amortization -= this.five_percent
                this.amount_due -= this.five_percent
                this.penalty = 0
                this.penaltyType = ""
            }
        }
    }
}
</script>