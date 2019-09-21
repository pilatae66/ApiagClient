<template>
<div>
  <v-system-bar window color="blue" dark><span style="color:white;">Customer Registration</span></v-system-bar>
  <v-expansion-panels accordion :value="0">
    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4">Customer name</v-col>
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
              v-model="customer.firstname"
              placeholder="Firstname"
            ></v-text-field>
          </v-col>
          <v-col cols="4">  
            <v-text-field
              v-model="customer.middlename"
              placeholder="Middlename"
            ></v-text-field>
          </v-col>
          <v-col cols="4">  
            <v-text-field
              v-model="customer.lastname"
              placeholder="Lastname"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4">Customer Details</v-col>
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
              v-model="customer_details.employment_type"
            ></v-select>
          </v-col>
           <v-col cols="4">  
            <v-text-field
              v-model="customer_details.mobile_number"
              placeholder="Mobile Number"
              v-mask="'(+63)##########'"
            ></v-text-field>
          </v-col> 
          <v-col cols="4">  
            <v-text-field
              v-model="customer_details.landline_number"
              placeholder="Landline Number"
              v-mask="'(###) ###-####'"
            ></v-text-field>
          </v-col> 
          <v-col cols="4">  
            <v-text-field
              v-model="customer_details.email"
              placeholder="E-mail"
              type="email"
            ></v-text-field>
          </v-col> 
          <v-col cols="4">  
            <v-text-field
              v-model="customer_details.religion"
              placeholder="Religion"
            ></v-text-field>
          </v-col> 
         <v-col cols="4" sm="4">
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="customer_details.date_of_birth"
              persistent
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="customer_details.date_of_birth"
                  label="Picker in dialog"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="customer_details.date_of_birth" type="date" scrollable>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(customer_details.date_of_birth)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col cols="4">  
            <v-text-field
              v-model="customer_details.place_of_birth"
              placeholder="Place of Birth"
            ></v-text-field>
          </v-col> 
          <v-col cols="4">  
            <v-select
              :items="civilItems"
              label="Civil Status"
              v-model="customer_details.civil_status"
            ></v-select>
          </v-col> 
          <v-col cols="4">  
            <v-select
              :items="educationalItems"
              label="Educational Attainment"
              v-model="customer_details.educational_attainment"
            ></v-select>
          </v-col>  
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4">Customer Address</v-col>
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
              v-model="customer_address.present_address"
              placeholder="Present Address"
            ></v-text-field>
          </v-col>
          <v-col cols="6">  
             <v-text-field
              v-model="customer_address.permanent_address"
              placeholder="Permanent Address"
            ></v-text-field>
          </v-col>
          </v-row>
          <v-row>
            <v-col>  
              <GmapMap
                :center="{lat:8.226157, lng:124.240102}"
                :zoom="10"
                map-type-id="terrain"
                style="width: 100%; height: 300px"
              >
                <GmapMarker
                  :key="index"
                  v-for="(m, index) in markers"
                  :position="m.position"
                  :clickable="true"
                  :draggable="true"
                  @click="center=m.position"
                />
              </GmapMap>
            </v-col>  
          </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4">Start and end dates</v-col>
          <v-col
            cols="8"
            class="text--secondary"
          >
            <v-fade-transition leave-absolute>
              <span v-if="open">When do you want to travel?</span>
              <v-row
                v-else
                no-gutters
                style="width: 100%"
              >
                <v-col cols="6">Start date: {{ 'Not set' }}</v-col>
                <v-col cols="6">End date: {{ 'Not set' }}</v-col>
              </v-row>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
    </v-expansion-panel>
  </v-expansion-panels>
</div>
</template>

<script>
  import { mask } from "vue-the-mask"
  export default {
    directives: {
      mask
    },
    data: () => ({
      employmentItems:['Employed', 'Self-Employed', 'Pensioner', 'Corporation', 'OFW Beneficiary'],
      educationalItems:['Elementary', 'Highschool Level', 'Highschool Grad', 'Post Grad', 'College Grad', 'Vocational'],
      civilItems:['Single', 'Married', 'Separated/Divorced', 'Widowed'],
      customer:{
        firstname:"",
        middlename:"",
        lastname:''
      },
      customer_details:{
        date_of_birth: new Date().toISOString().substr(0, 7),
        civil_status:'',
        employment_type:'',
        mobile_number:'',
        landline_number:'',
        place_of_birth:'',
        religion:'',
        email:'',
      },
      customer_address:{
        present_address:'',
        permanent_address:''
      }
    }),
  }
</script>