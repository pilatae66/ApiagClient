<template>
<div>
    <v-card color="blue" dark>
        <v-card-title><v-icon left>mdi-account-plus</v-icon> Customer Registration</v-card-title>
    </v-card>
  <v-expansion-panels accordion :value="0">

    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4"><v-icon left>mdi-account-plus</v-icon> Customer name</v-col>
          <v-col
            cols="8"
            class="text--secondary"
          >
            <v-fade-transition leave-absolute>
              <span
                v-if="open"
                key="0"
              >
                Enter a customer name
              </span>
              <span
                v-else
                key="1"
              >
              </span>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row>
          <v-col cols="4">  
            <v-text-field
              v-model="customer.customer_name.firstname"
              placeholder="Firstname"
              :error-messages="this.error.customer_name.firstname"
            ></v-text-field>
          </v-col>
          <v-col cols="4">  
            <v-text-field
              v-model="customer.customer_name.middlename"
              placeholder="Middlename"
              :error-messages="this.error.customer_name.middlename"
            ></v-text-field>
          </v-col>
          <v-col cols="4">  
            <v-text-field
              v-model="customer.customer_name.lastname"
              placeholder="Lastname"
              :error-messages="this.error.customer_name.lastname"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4"><v-icon left>mdi-account-details</v-icon> Customer Details</v-col>
          <v-col
            cols="8"
            class="text--secondary"
          >
            <v-fade-transition leave-absolute>
              <span
                v-if="open"
                key="0"
              >
                Fill in customer details
              </span>
              <span
                v-else
                key="1"
              >
              </span>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row>
          <v-col cols="4">  
             <v-select
              :items="employmentItems"
              label="Employment Type"
              v-model="customer.customer_details.employment_type"
              :error-messages="this.error.customer_details.employment_type"
            ></v-select>
          </v-col>
           <v-col cols="4">  
            <v-text-field
              v-model="customer.customer_details.mobile_number"
              placeholder="Mobile Number"
              v-mask="'(+63)##########'"
              :error-messages="this.error.customer_details.mobile_number"
            ></v-text-field>
          </v-col> 
          <v-col cols="4">  
            <v-text-field
              v-model="customer.customer_details.landline_number"
              placeholder="Landline Number"
              v-mask="'(###) ###-####'"
              :error-messages="this.error.customer_details.landline_number"
            ></v-text-field>
          </v-col> 
          <v-col cols="4">  
            <v-text-field
              v-model="customer.customer_details.email"
              placeholder="E-mail"
              type="email"
              :error-messages="this.error.customer_details.email"
            ></v-text-field>
          </v-col> 
          <v-col cols="4">  
            <v-text-field
              v-model="customer.customer_details.religion"
              placeholder="Religion"
              :error-messages="this.error.customer_details.religion"
            ></v-text-field>
          </v-col> 
         <v-col cols="4" sm="4">
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="customer.customer_details.date_of_birth"
              persistent
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="customer.customer_details.date_of_birth"
                  label="Picker in dialog"
                  readonly
                  v-on="on"
                  :error-messages="error.customer_details.date_of_birth"
                ></v-text-field>
              </template>
              <v-date-picker v-model="customer.customer_details.date_of_birth" type="date" scrollable>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(customer.customer_details.date_of_birth)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col cols="4">  
            <v-text-field
              v-model="customer.customer_details.place_of_birth"
              placeholder="Place of Birth"
              :error-messages="this.error.customer_details.place_of_birth"
            ></v-text-field>
          </v-col> 
          <v-col cols="4">  
            <v-select
              :items="civilItems"
              label="Civil Status"
              v-model="customer.customer_details.civil_status"
              :error-messages="this.error.customer_details.civil_status"
            ></v-select>
          </v-col> 
          <v-col cols="4">  
            <v-select
              :items="educationalItems"
              label="Educational Attainment"
              v-model="customer.customer_details.educational_attainment"
              :error-messages="this.error.customer_details.educational_attainment"
            ></v-select>
          </v-col>  
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4"><v-icon left>mdi-map-marker</v-icon> Customer Address</v-col>
          <v-col
            cols="8"
            class="text--secondary"
          >
            <v-fade-transition leave-absolute>
              <span
                v-if="open"
                key="0"
              >
                Fill in customer address
              </span>
              <span
                v-else
                key="1"
              >
              </span>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row>
          <v-col cols="6">  
             <v-text-field
              v-model="customer.customer_address.present_address"
              placeholder="Present Address"
              :error-messages="this.error.customer_address.present_address"
            ></v-text-field>
          </v-col>
          <v-col cols="6">  
             <v-text-field
              v-model="customer.customer_address.permanent_address"
              placeholder="Permanent Address"
              :error-messages="this.error.customer_address.permanent_address"
            ></v-text-field>
          </v-col>
          </v-row>
          <p class="title" ref='test'><v-icon left>mdi-google-maps</v-icon> GPS Location</p>
          <v-row>
            <v-col>  
              <gmap-map
                ref="gmap"
                :center="{lat:8.226157, lng:124.240102}"
                :zoom="10"
                style="width: 100%; height: 300px"   
                @click="addCoordinates"    
              >
                <gmap-marker
                  :position="marker.position"
                />
              </gmap-map>
            </v-col>  
          </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4"><v-icon left>mdi-home-heart</v-icon> Customer Family</v-col>
          <v-col
            cols="8"
            class="text--secondary"
          >
            <v-fade-transition leave-absolute>
              <span
                v-if="open"
                key="0"
              >
                Fill in customer family details
              </span>
              <span
                v-else
                key="1"
              >
              </span>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row>
          <v-col cols="6">  
             <v-text-field
              v-model="customer.customer_family.father_name"
              placeholder="Father's Name"
              :error-messages="this.error.customer_family.father_name"
            ></v-text-field>
          </v-col>
          <v-col cols="6">  
             <v-text-field
              v-model="customer.customer_family.mother_name"
              placeholder="Mother's Name"
              :error-messages="this.error.customer_family.mother_name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">  
             <v-text-field
              v-model="customer.customer_family.spouse_name"
              placeholder="Spouse's Name"
              :error-messages="this.error.customer_family.spouse_name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">  
             <v-text-field
              v-model="customer.customer_family.dependent1"
              placeholder="Dependent # 1 Name"
              :error-messages="this.error.customer_family.dependent1"
            ></v-text-field>
          </v-col>
          <v-col cols="4">  
             <v-text-field
              v-model="customer.customer_family.dependent2"
              placeholder="Dependent # 2 Name"
              :error-messages="this.error.customer_family.dependent2"
            ></v-text-field>
          </v-col>
          <v-col cols="4">  
             <v-text-field
              v-model="customer.customer_family.dependent3"
              placeholder="Dependent # 3 Name"
              :error-messages="this.error.customer_family.dependent3"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4"><v-icon left>mdi-briefcase</v-icon> Customer Employment Details</v-col>
          <v-col
            cols="8"
            class="text--secondary"
          >
            <v-fade-transition leave-absolute>
              <span
                v-if="open"
                key="0"
              >
                Fill in customer employment details
              </span>
              <span
                v-else
                key="1"
              >
              </span>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content v-if="this.customer.customer_details.employment_type === 'Self-Employed'">
        <v-row>
            <v-col cols="6">  
                <v-text-field
                    v-model="customer.customer_employment_details.self_employed.business_name"
                    placeholder="Business Name"
                ></v-text-field>
            </v-col>
            <v-col cols="6">  
                <v-text-field
                    v-model="customer.customer_employment_details.self_employed.nature_of_business"
                    placeholder="Nature of Business"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">  
                <v-text-field
                    v-model="customer.customer_employment_details.self_employed.address"
                    placeholder="Address"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">  
                <v-text-field
                    v-model="customer.customer_employment_details.self_employed.landline_number"
                    placeholder="Landline Number"
                ></v-text-field>
            </v-col>
            <v-col cols="6">  
                <v-text-field
                    v-model="customer.customer_employment_details.self_employed.mobile_number"
                    placeholder="Mobile Number"
                ></v-text-field>
            </v-col>
        </v-row>
      </v-expansion-panel-content>
      <v-expansion-panel-content v-if="this.customer.customer_details.employment_type === 'Employed'">
        <v-row>
            <v-col cols="4">  
                <v-select
                    :items="typeOrgItems"
                    label="Type of Organization"
                    v-model="customer.customer_employment_details.employed.type_of_org"
                ></v-select>
            </v-col>
            <v-col cols="4">  
                <v-text-field
                    v-model="customer.customer_employment_details.employed.company_name"
                    placeholder="Company Name"
                ></v-text-field>
            </v-col>
            <v-col cols="2">  
                <v-text-field
                    v-model="customer.customer_employment_details.employed.length_of_stay"
                    placeholder="Length of Stay"
                ></v-text-field>
            </v-col>
            <v-col cols="2">  
                <v-text-field
                    v-model="customer.customer_employment_details.employed.nature_of_business"
                    placeholder="Nature of Business"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">  
                <v-text-field
                    v-model="customer.customer_employment_details.employed.address"
                    placeholder="Address"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">  
                <v-text-field
                    v-model="customer.customer_employment_details.employed.landline_number"
                    placeholder="Landline Number"
                ></v-text-field>
            </v-col>
            <v-col cols="6">  
                <v-text-field
                    v-model="customer.customer_employment_details.employed.mobile_number"
                    placeholder="Mobile Number"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">  
                <v-text-field
                    v-model="customer.customer_employment_details.employed.position"
                    placeholder="Position"
                ></v-text-field>
            </v-col>
            <v-col cols="6">  
                <v-select
                    :items="empstatItems"
                    label="Employment Status"
                    v-model="customer.customer_employment_details.employed.employment_status"
                ></v-select>
            </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4"><v-icon left>mdi-finance</v-icon> Customer Financial Information</v-col>
          <v-col
            cols="8"
            class="text--secondary"
          >
            <v-fade-transition leave-absolute>
              <span
                v-if="open"
                key="0"
              >
                Fill in customer financial information
              </span>
              <span
                v-else
                key="1"
              >
              </span>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <h3 class="title">Income</h3>
        <v-row v-for="(income, index) in customer.customer_financial_info.income">
            <v-col cols="4">  
                <v-text-field
                    v-model="income.source_of_income"
                    placeholder="Source of Income"
                ></v-text-field>
            </v-col>
            <v-col cols="4">  
                <v-text-field
                    v-model="income.who"
                    placeholder="Who"
                ></v-text-field>
            </v-col>
            <v-col cols="3">  
                <v-text-field
                    v-model="income.amount"
                    placeholder="Amount"
                ></v-text-field>
            </v-col>
            <v-col cols="1">  
                <v-btn fab text color="red" @click="removeIcomeField(index)">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-col>
            <v-btn block color="blue" dark @click="addIncomeField">Add Income Field</v-btn>
        </v-col>
        <h3 class="title">Liability</h3>
        <v-row v-for="(liability, index) in customer.customer_financial_info.liability">
            <v-col cols="8">  
                <v-text-field
                    v-model="liability.liability"
                    placeholder="Liability"
                ></v-text-field>
            </v-col>
            <v-col cols="3">  
                <v-text-field
                    v-model="liability.amount"
                    placeholder="Amount"
                ></v-text-field>
            </v-col>
            <v-col cols="1">  
                <v-btn text fab color="red" @click="removeLiabilityField(index)">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-col>
            <v-btn block color="blue" dark @click="addLiabilityField">Add Liability Field</v-btn>
        </v-col>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  <v-card>
    <v-card-actions>
        <v-btn color="blue" dark @click="goBack"><v-icon left>mdi-arrow-left</v-icon> Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="green" dark @click="save" :loading="loading">Save <v-icon right>mdi-content-save</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script >
    import {
        mask
    } from "vue-the-mask"
import { mapActions, mapState } from 'vuex'
import { stat } from 'fs'
export default {
    directives: {
        mask
    },
    data: () => ({
        modal: false,
        employmentItems: ['Employed', 'Self-Employed', 'Pensioner', 'Corporation', 'OFW Beneficiary'],
        educationalItems: ['Elementary', 'Highschool Level', 'Highschool Grad', 'Post Grad', 'College Grad', 'Vocational'],
        civilItems: ['Single', 'Married', 'Separated/Divorced', 'Widowed'],
        typeOrgItems:['Government', ' Cooperative', 'Private', 'NGO'],
        empstatItems:['Regular', 'Contractual', 'Probationary'],
        marker:{
            position:{
            }
        },
        customer: {
            map: null,
            customer_name:{
                firstname: "",
                middlename: "",
                lastname: ''
            },
             customer_details: {
                date_of_birth:'',
                civil_status: '',
                employment_type: '',
                mobile_number: '',
                landline_number: '',
                place_of_birth: '',
                religion: '',
                email: '',
                age:0,
                educational_attainment:''
            },
            customer_address: {
                present_address: '',
                permanent_address: '',
                lat: 0,
                lng: 0
            },
            customer_family: {
                father_name: '',
                mother_name: '',
                spouse_name: '',
                dependent1: '',
                dependent2: '',
                dependent3: ''
            },
            customer_employment_details: {
                self_employed: {
                    business_name: '',
                    nature_of_business: '',
                    address: '',
                    landline_number: '',
                    mobile_number: ''
                },
                employed: {
                    type_of_org: "",
                    company_name: "",
                    length_of_stay: "",
                    address: "",
                    landline_number: "",
                    mobile_number: "",
                    nature_of_business: "",
                    position: "",
                    employment_status: ""
                }
            },
            customer_financial_info:{
                income:[{
                    source_of_income:'',
                    who:'',
                    amount:0
                }],
                liability:[{
                    liability:'',
                    amount:0
                }]
            }
        }
    }),
    computed:{
        ...mapState({
            error: state => state.customers.errors,
            loading: 'loading'
        })
    },  
    methods:{
        ...mapActions([
            'customerStore'
        ]),
        addCoordinates(place){
            this.$refs.gmap.$mapPromise.then((map) => {
                console.log(this.$refs);
                
                this.map = map
            });
            this.marker.position = { lat: place.latLng.lat(), lng: place.latLng.lng() }
        },
        addIncomeField(){
            this.customer.customer_financial_info.income.push({
                source_of_income:'',
                who:'',
                amount:0
            })
        },
        removeIcomeField(index){
            this.customer_financial_info.income.splice(index,1)
        },
        addLiabilityField(){
            this.customer.customer_financial_info.liability.push({
                liability:'',
                amount:0
            })
        },
        removeLiabilityField(index){
            this.customer.customer_financial_info.liability.splice(index,1)
        },
        goBack(){
            this.$router.back()
        },
        save(){
            this.customer.customer_address.lat = this.marker.position.lat
            this.customer.customer_address.lng = this.marker.position.lng
            this.customerStore(this.customer)
        }
    }
} 
</script>