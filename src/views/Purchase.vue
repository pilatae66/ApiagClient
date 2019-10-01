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
                            <v-col>
                                <v-select
                                    :items="appTypeItems"
                                    label="Application Type"
                                    v-model="application_type"
                                ></v-select>
                            </v-col>
                            <v-col>
                                <v-select
                                    :items="custTypeItems"
                                    label="Borrower Type"
                                    v-model="customer_type"
                                ></v-select>
                            </v-col>
                        </v-row>
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
                            <v-col cols="5">
                                <v-text-field placeholder="TIN Number" type="number" v-model="tin"></v-text-field>
                            </v-col>
                            <v-col cols="5">
                                <v-text-field placeholder="SSS" type="number" v-model="sss"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field placeholder="Driver's License" type="number" v-model="driver_license"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field placeholder="GSIS Number" type="number" v-model="gsis"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-autocomplete
                                    v-model="selectedProduct"
                                    :items="products"
                                    label="Search Product to Purchase..."
                                    item-value="id"
                                    :filter="filterProducts"
                                    hide-no-data
                                    >
                                    <template v-slot:selection="data">
                                        {{ data.item.brand }} {{ data.item.model }}
                                    </template>
                                    <template v-slot:item="data">
                                        <template v-if="typeof data.item !== 'object'">
                                            <v-list-item-content v-text="data.item"></v-list-item-content>
                                        </template>
                                        <template v-else>
                                        <v-list-item-content>
                                            <v-row>
                                                <v-col>
                                                    <v-list-item-title v-text="`${data.item.brand} ${data.item.model}`"></v-list-item-title>
                                                    <v-list-item-subtitle v-html="data.item.color"></v-list-item-subtitle>
                                                </v-col>
                                                <v-col>
                                                    <v-list-item-title v-text="`Type: ${data.item.type}`"></v-list-item-title>
                                                </v-col>
                                                <v-col>
                                                    <v-list-item-title v-text="`Quantity: ${data.item.quantity}`"></v-list-item-title>
                                                </v-col>
                                            </v-row>
                                        </v-list-item-content>
                                        </template>
                                    </template>
                                </v-autocomplete>
                            </v-col>
                            <v-col>
                                <v-select
                                    v-model="requirements"
                                    :items="requirementItems"
                                    label="Requirements"
                                    multiple
                                    chips
                                ></v-select>
                            </v-col>
                        </v-row>
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
        selectedProduct: null,
        filteredProducts: [],
        product:"",
        search: null,
        priorityItems:[
            'High', 'Normal'
        ],
        mcItems:[
            'MC Owner/User', 'NonUser', 'User'
        ],
        purposeItems:[
            'Delivery/Messengeral', 'Leisure', 'Service/Daily Use', 'Public Utility'
        ],
        appTypeItems:[
            'NEW', 'REPEAT'
        ],
        custTypeItems:[
            'MAKER', 'CO-MAKER'
        ],
        requirementItems:[
            'PRC ID', 'COMPANY ID', 'PASSPORT', 'SENIOR CTN CARD', 'POSTAL ID', 'OWWA ID', 'VOTERS ID'
        ],
        priority_level:'',
        MC_user_type:'',
        loan_purpose:'',
        customer_type:'',
        application_type:'',
        tin:'',
        sss:'',
        term:'',
        driver_license:'',
        gsis:'',
        requirements:''
    }),
    created(){
        this.productInit()
        this.id = this.$route.params.id
    },
    watch:{
        search (val) {
            val && this.filterProducts(val)
        },
    },
    computed:{
        ...mapState({
            products: state => state.products.products,
            auth_user_id: state => state.user.auth_user.id,
            purchased_product: 'purchased_product'
        }),
    },
    methods:{
        ...mapActions([
            'productInit',
            'purchasedProductsStore',
            'productShow'
        ]),
        filterProducts(item, queryText, itemText) {
            const brand = item.brand.toLowerCase()
            const model = item.model.toLowerCase()
            const color = item.color.toLowerCase()
            const type = item.type.toLowerCase()
            const searchText = queryText.toLowerCase()

            return brand.indexOf(searchText) > -1 
                || model.indexOf(searchText) > -1
                || color.indexOf(searchText) > -1
                || type.indexOf(searchText) > -1
        },
        goBack(){
            router.back()
        },
        save(){
            let product = this.products.filter(product => {
                return product.id == this.selectedProduct
            })
            console.log(product[0].quantity - 1);
            
            
            let amountFinance = Number(product[0].price.replace(/[^0-9.-]+/g,"")) - Number(product[0].downpayment.replace(/[^0-9.-]+/g,""))
            let monthlyAmortization = amountFinance / this.term
            let data = {
                term: parseInt(this.term),
                product_id: this.selectedProduct,
                quantity: product[0].quantity - 1,
                application_type: this.application_type,
                tin: this.tin,
                sss: this.sss,
                driver_license: this.driver_license,
                gsis: this.gsis,
                user_id: this.id,
                priority_level: this.priority_level,
                MC_user_type: this.MC_user_type,
                loan_purpose: this.loan_purpose,
                amount_finance: amountFinance,
                monthly_amortization: monthlyAmortization.toFixed(2),
                sales_agent: this.auth_user_id,
                requirements: this.requirements,
                customer_type: this.customer_type
            }
            this.purchasedProductsStore(data)
        }
    }
}
</script>