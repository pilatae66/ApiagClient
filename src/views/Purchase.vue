<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card
                    class="mx-auto"
                    width="100vw"
                    tile
                >
                     <v-toolbar
                    color="blue"
                    dark
                    >
                    <v-toolbar-title>Purchase Form</v-toolbar-title>
                    <div class="flex-grow-1"></div>
                    </v-toolbar>
                    <v-container style="padding-left:50px; padding-right:50px;">
                        <v-row>
                            <v-col cols="4">
                                <v-select
                                    :items="priorityItems"
                                    label="Priority Level"
                                    v-model="priority_level"
                                ></v-select>
                            </v-col>
                            <v-col cols="4">
                                <v-select
                                    :items="mcItems"
                                    label="MC Usertype"
                                    v-model="MC_user_type"
                                ></v-select>
                            </v-col>
                            <v-col cols="4">
                                <v-select
                                    :items="purposeItems"
                                    label="Loan Purpose"
                                    v-model="loan_purpose"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="2">
                                <v-text-field placeholder="Term" type="number" v-model="term"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-list flat style="border: 1px solid silver">
                            <v-subheader>
                                PRODUCT LIST 
                                <v-spacer></v-spacer>
                                <v-col cols="2">
                                    <v-text-field v-model="product" placeholder="Search Product..."></v-text-field>
                                </v-col>
                            </v-subheader>
                            <v-list-item-group color="primary" style="overflow-x:auto; max-height:200px" >
                                <v-list-item
                                v-for="product in filteredProducts"
                                :key="product.id"
                                @click="selectProduct(product)"
                                >
                                <template v-slot:default="{ active }">
                                    <v-list-item-action>
                                    <v-checkbox v-model="active"></v-checkbox>
                                    </v-list-item-action>

                                    <v-list-item-content>
                                    <v-list-item-title v-text="`${product.brand} ${product.model}`"></v-list-item-title>
                                    <v-list-item-subtitle v-text="`${product.color}`"></v-list-item-subtitle>
                                    </v-list-item-content>
                                </template>
                                <v-list-item-content>
                                    <v-list-item-title></v-list-item-title>
                                </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-container>
                    <v-card-actions>
                        <v-btn depressed @click="goBack" color="blue" dark><v-icon left>mdi-arrow-left</v-icon> Go Back</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn depressed color="green" dark @click="save()">Save <v-icon right>mdi-content-save</v-icon></v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import router from '../router'
import { mapState, mapActions } from 'vuex'
export default {
    data:() => ({
        id:'',
        selectedProduct: {},
        product:"",
        priorityItems:[
            'High', 'Normal'
        ],
        mcItems:[
            'MC Owner/User', 'NonUser', 'User'
        ],
        purposeItems:[
            'Delivery/Messengeral', 'Leisure', 'Service/Daily Use', 'Public Utility'
        ],
        priority_level:'',
        MC_user_type:'',
        loan_purpose:'',
        term:''
    }),
    created(){
        this.productInit()
        this.id = this.$route.params.id
    },
    computed:{
        ...mapState({
            products: state => state.products.products,
            auth_user_id: state => state.user.auth_user.id,
            purchased_product: 'purchased_product'
        }),
        filteredProducts(){
            return this.products.filter(product => {
                return product.model.toLowerCase().includes(this.product.toLowerCase()) || product.brand.toLowerCase().includes(this.product.toLowerCase()) || product.color.toLowerCase().includes(this.product.toLowerCase())
            })
        }
    },
    methods:{
        ...mapActions([
            'productInit',
            'getPurchaseDetails'
        ]),
        goBack(){
            router.back()
        },
        selectProduct(product){
            this.selectedProduct = product
        },
        save(){
            let amountFinance = Number(this.selectedProduct.price.replace(/[^0-9.-]+/g,"")) - Number(this.selectedProduct.downpayment.replace(/[^0-9.-]+/g,""))
            let monthlyAmortization = amountFinance / this.term
            let data = {
                term: parseInt(this.term),
                product_id: this.selectedProduct.id,
                user_id: this.id,
                priority_level: this.priority_level,
                MC_user_type: this.MC_user_type,
                loan_purpose: this.loan_purpose,
                amount_finance: amountFinance,
                monthly_amortization: monthlyAmortization.toFixed(2),
                sales_agent: this.auth_user_id
            }
            this.getPurchaseDetails(data)
        }
    }
}
</script>