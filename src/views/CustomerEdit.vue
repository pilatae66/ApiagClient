<template>
<div>
    <v-card color="blue" dark>
        <v-card-title><v-icon left>mdi-account-plus</v-icon> Customer Edit</v-card-title>
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
              v-model="customer.name.firstname"
              placeholder="Firstname"
            ></v-text-field>
          </v-col>
          <v-col cols="4">  
            <v-text-field
              v-model="customer.name.middlename"
              placeholder="Middlename"
            ></v-text-field>
          </v-col>
          <v-col cols="4">  
            <v-text-field
              v-model="customer.name.lastname"
              placeholder="Lastname"
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
              :value="customer.details.employment_type"
              v-model="customer.details.employment_type"
            ></v-select>
          </v-col>
           <v-col cols="4">  
            <v-text-field
              v-model="customer.details.mobile_number"
              placeholder="Mobile Number"
              v-mask="'(+63)##########'"
            ></v-text-field>
          </v-col> 
          <v-col cols="4">  
            <v-text-field
              v-model="customer.details.landline_number"
              placeholder="Landline Number"
              v-mask="'(###) ###-####'"
            ></v-text-field>
          </v-col> 
          <v-col cols="4">  
            <v-text-field
              v-model="customer.details.email"
              placeholder="E-mail"
              type="email"
            ></v-text-field>
          </v-col> 
          <v-col cols="4">  
            <v-text-field
              v-model="customer.details.religion"
              placeholder="Religion"
            ></v-text-field>
          </v-col> 
         <v-col cols="4" sm="4">
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="customer.details.date_of_birth"
              persistent
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="customer.details.date_of_birth"
                  label="Date of Birth"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="customer.details.date_of_birth" type="date" scrollable>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(customer.details.date_of_birth)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col cols="4">  
            <v-text-field
              v-model="customer.details.place_of_birth"
              placeholder="Place of Birth"
            ></v-text-field>
          </v-col> 
          <v-col cols="4">  
            <v-select
              :items="civilItems"
              label="Civil Status"
              :value="customer.details.civil_status"
              v-model="customer.details.civil_status"
            ></v-select>
          </v-col> 
          <v-col cols="4">  
            <v-select
              :items="educationalItems"
              label="Educational Attainment"
              :value="customer.details.educational_attainment"
              v-model="customer.details.educational_attainment"
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
              v-model="customer.address.present_address"
              placeholder="Present Address"
            ></v-text-field>
          </v-col>
          <v-col cols="6">  
             <v-text-field
              v-model="customer.address.permanent_address"
              placeholder="Permanent Address"
            ></v-text-field>
          </v-col>
          </v-row>
          <p class="title" ref='test'><v-icon left>mdi-google-maps</v-icon> GPS Locator</p>
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
                v-if="marker.position != null"
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
              v-model="customer.family.father_name"
              placeholder="Father's Name"
            ></v-text-field>
          </v-col>
          <v-col cols="6">  
             <v-text-field
              v-model="customer.family.mother_name"
              placeholder="Mother's Name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">  
             <v-text-field
              v-model="customer.family.spouse_name"
              placeholder="Spouse's Name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">  
             <v-text-field
              v-model="customer.family.dependent1"
              placeholder="Dependent # 1 Name"
            ></v-text-field>
          </v-col>
          <v-col cols="4">  
             <v-text-field
              v-model="customer.family.dependent2"
              placeholder="Dependent # 2 Name"
            ></v-text-field>
          </v-col>
          <v-col cols="4">  
             <v-text-field
              v-model="customer.family.dependent3"
              placeholder="Dependent # 3 Name"
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
      <v-expansion-panel-content v-if="this.customer.details.employment_type === 'Self-Employed'">
        <v-row>
            <v-col cols="6">  
                <v-text-field
                    v-model="customer.employment_details.business_name"
                    placeholder="Business Name"
                ></v-text-field>
            </v-col>
            <v-col cols="6">  
                <v-text-field
                    v-model="customer.employment_details.nature_of_business"
                    placeholder="Nature of Business"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">  
                <v-text-field
                    v-model="customer.employment_details.address"
                    placeholder="Address"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">  
                <v-text-field
                    v-model="customer.employment_details.landline_number"
                    placeholder="Landline Number"
                ></v-text-field>
            </v-col>
            <v-col cols="6">  
                <v-text-field
                    v-model="customer.employment_details.mobile_number"
                    placeholder="Mobile Number"
                ></v-text-field>
            </v-col>
        </v-row>
      </v-expansion-panel-content>
      <v-expansion-panel-content v-if="this.customer.details.employment_type === 'Employed'">
        <v-row>
            <v-col cols="4">  
                <v-select
                    :items="typeOrgItems"
                    label="Type of Organization"
                    v-model="customer.employment_details.type_of_org"
                ></v-select>
            </v-col>
            <v-col cols="4">  
                <v-text-field
                    v-model="customer.employment_details.company_name"
                    placeholder="Company Name"
                ></v-text-field>
            </v-col>
            <v-col cols="2">  
                <v-text-field
                    v-model="customer.employment_details.length_of_stay"
                    placeholder="Length of Stay"
                ></v-text-field>
            </v-col>
            <v-col cols="2">  
                <v-text-field
                    v-model="customer.employment_details.nature_of_business"
                    placeholder="Nature of Business"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">  
                <v-text-field
                    v-model="customer.employment_details.address"
                    placeholder="Address"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">  
                <v-text-field
                    v-model="customer.employment_details.landline_number"
                    placeholder="Landline Number"
                ></v-text-field>
            </v-col>
            <v-col cols="6">  
                <v-text-field
                    v-model="customer.employment_details.mobile_number"
                    placeholder="Mobile Number"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">  
                <v-text-field
                    v-model="customer.employment_details.position"
                    placeholder="Position"
                ></v-text-field>
            </v-col>
            <v-col cols="6">  
                <v-select
                    :items="empstatItems"
                    label="Employment Status"
                    v-model="customer.employment_details.employment_status"
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
        <v-row v-for="(income, index) in customer.income">
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
        <v-row v-for="(liability, index) in customer.liability">
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
        <v-btn color="green" dark @click="save" :loading="loading">Update <v-icon right>mdi-content-save</v-icon></v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script >
    import {
        mask
    } from "vue-the-mask"
import { mapActions, mapState } from 'vuex'
import router from '../router'
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
            position:null
        },
        customer: {
            map: null,
            name:{
                firstname: "",
                middlename: "",
                lastname: ''
            },
             details: {
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
            address: {
                present_address: '',
                permanent_address: '',
                lat: 0,
                lng: 0
            },
            family: {
                father_name: '',
                mother_name: '',
                spouse_name: '',
                dependent1: '',
                dependent2: '',
                dependent3: ''
            },
            employment_details: {
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
            financial_info:{
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
    created(){
      this.customer = this.$route.params.item
      this.marker.position = { lat: parseFloat(this.customer.address.lat), lng: parseFloat(this.customer.address.lng) }
      console.log(this.customer)
    },
    computed:{
        ...mapState({
            error: state => state.customers.errors,
            loading: 'loading'
        })
    },  
    methods:{
        ...mapActions([
            'customerUpdate'
        ]),
        addCoordinates(place){
            this.marker.position = { lat: place.latLng.lat(), lng: place.latLng.lng() }
        },
        addIncomeField(){
            this.customer.income.push({
                source_of_income:'',
                who:'',
                amount:0
            })
        },
        removeIcomeField(index){
            this.income.splice(index,1)
        },
        addLiabilityField(){
            this.customer.liability.push({
                liability:'',
                amount:0
            })
        },
        removeLiabilityField(index){
            this.customer.liability.splice(index,1)
        },
        goBack(){
            this.$router.push({name:'customer'})
        },
        save(){
          let data = {
            id:this.customer.id,
            address:{
              present_address:this.customer.address.present_address,
              lat:this.marker.position.lat,
              lng:this.marker.position.lng,
              permanent_address:this.customer.address.permanent_address,
              
            },
            details:{
              mobile_number:this.customer.details.mobile_number,
              landline_number:this.customer.details.landline_number,
              email:this.customer.details.email,
              religion:this.customer.details.religion,
              date_of_birth:this.customer.details.date_of_birth,
              age:this.customer.details.age,
              place_of_birth:this.customer.details.place_of_birth,
              civil_status:this.customer.details.civil_status,
              educational_attainment:this.customer.details.educational_attainment,
              employment_type:this.customer.details.employment_type,
              
            },
            family:{
              father_name:this.customer.family.father_name,
              mother_name:this.customer.family.mother_name,
              spouse_name:this.customer.family.spouse_name,
              dependent1:this.customer.family.dependent1,
              dependent2:this.customer.family.dependent2,
              dependent3:this.customer.family.dependent3,
              
            },
            income:this.customer.income,
            liability:this.customer.liability,
            employment_details:{
              business_name:this.customer.employment_details.business_name,
              nature_of_business:this.customer.employment_details.nature_of_business,
              address:this.customer.employment_details.address,
              landline_number:this.customer.employment_details.landline_number,
              mobile_number:this.customer.employment_details.mobile_number,
            },
            name:{
              firstname:this.customer.name.firstname,
              middlename:this.customer.name.middlename,
              lastname:this.customer.name.lastname
              
            }
          }
          this.customerUpdate(data)
        }
    }
} 
</script>