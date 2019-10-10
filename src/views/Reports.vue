<template>
  <v-card
    class="mx-auto"
    width="100vw"
  >
  <v-card-title>Reports</v-card-title>

  <v-container fluid>
      <v-row>
          <v-col cols="3">
              <v-select
              :items="reportItems"
              label="Report Type"
              v-model="report_type"
            ></v-select>
          </v-col>
          <v-col cols="3" v-if="report_type == 'Daily'">
              <v-dialog
              ref="daily_dialog"
              v-model="daily_date_modal"
              :return-value.sync="daily_date"
              persistent
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="daily_date"
                  label="Select Date..."
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="daily_date" type="date" scrollable>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" @click="daily_date_modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.daily_dialog.save(daily_date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col cols="3" v-else-if="report_type == 'Monthly'">
              <v-dialog
              ref="monthy_dialog"
              v-model="monthly_date_modal"
              :return-value.sync="monthly_date"
              persistent
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="monthly_date"
                  label="Select Month..."
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="monthly_date" type="month" scrollable>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" @click="monthly_date_modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.monthy_dialog.save(monthly_date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col cols="3" v-else-if="report_type == 'Annual'">
              <v-dialog
              ref="annual_dialog"
              v-model="annual_date_modal"
              :return-value.sync="annual_date"
              persistent
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="formatToYear"
                  label="Select Year..."
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="annual_date" type="date" scrollable>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" @click="annual_date_modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.annual_dialog.save(annual_date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
          <v-col class="text-right">
              <v-btn color="blue" dark @click="generateReport" :loading="loading">Generate</v-btn>
          </v-col>
      </v-row>
      <div v-show="this.reports.payments != null && this.reports.purchased_products != null">
        <v-row>
            <v-col>
                Number of Products Purchased: {{ reports != null ? reports.purchased_products_count : 0 }}
            </v-col>
            <v-col>
                Total downpayments: ₱{{  reports != null ? reports.total_downpayments : 0 }}
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                Number of Customers Paid: {{  reports != null ? reports.payments_count : 0 }}
            </v-col>
            <v-col>
                Total payments: ₱{{  reports != null ? reports.total_payment : 0 }}
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div class="title text-center font-weight-thin my-5">Products Purchased in {{ reports != null ? reports.date : '' }}</div>
                <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Purchase #</th>
                            <th class="text-left">Customer Name</th>
                            <th class="text-left">Product</th>
                        </tr>
                    </thead>
                    <tbody v-if="reports.purchased_products != null">
                            <tr v-for="item in reports.purchased_products" :key="item.id">
                                <td>{{ item.id }}</td>
                                <td>{{ capitalize(item.user.firstname) }} {{ capitalize(item.user.middlename[0]) }} {{ capitalize(item.user.lastname) }}</td>
                                <td>{{ item.product.brand }} {{ item.product.model }}</td>
                            </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="6" class="text-center font-weight-thin">No Data Available</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div class="title text-center font-weight-thin my-5">Payments in {{ reports != null ? reports.date : '' }}</div>
                <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">Receipt #</th>
                            <th class="text-left">Customer Name</th>
                            <th class="text-left">Product</th>
                            <th class="text-left">Amount</th>
                            <th class="text-left">Remarks</th>
                            <th class="text-left">Branch</th>
                        </tr>
                    </thead>
                    <tbody v-if="reports.payments != null">
                            <tr v-for="item in reports.payments" :key="item.name">
                                <td>{{ item.id }}</td>
                                <td>{{ capitalize(item.customer.firstname) }} {{ capitalize(item.customer.middlename[0]) }} {{ capitalize(item.customer.lastname) }}</td>
                                <td>{{ item.purchased_product.product.brand }} {{ item.purchased_product.product.model }}</td>
                                <td>{{ item.amount }}</td>
                                <td>{{ item.remarks }}</td>
                                <td>{{ item.cashier.branch.branch_name }} City Branch</td>
                            </tr>
                    </tbody>
                    <tbody v-else>
                        <td colspan="6" class="text-center font-weight-thin">No Data Available</td>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
      </div>
  </v-container>
  </v-card>
</template>

<script>
  import moment from 'moment'
  import { mapState, mapActions } from 'vuex'
  export default {
    data:() => ({
        daily_date: new Date().toISOString().substr(0, 10),
        monthly_date: new Date().toISOString().substr(0, 10),
        annual_date: new Date().toISOString().substr(0, 4),
        daily_date_modal: false,
        monthly_date_modal: false,
        annual_date_modal: false,
        reportItems: [ 'Daily', 'Monthly', 'Annual' ],
        report_type:''
    }),
    watch:{
        report_type(newValue, oldValue){
            if (newValue == 'Daily') {
                this.monthly_date = new Date().toISOString().substr(0, 10)
                this.daily_date = new Date().toISOString().substr(0, 10)
                this.annual_date = new Date().toISOString().substr(0, 4)
            }
            else if (newValue == 'Monthly') {
                this.monthly_date = new Date().toISOString().substr(0, 10)
                this.daily_date = new Date().toISOString().substr(0, 10)
                this.annual_date = new Date().toISOString().substr(0, 4)
            }
            else{
                this.monthly_date = new Date().toISOString().substr(0, 10)
                this.daily_date = new Date().toISOString().substr(0, 10)
                this.annual_date = new Date().toISOString().substr(0, 4)
            }
        }
    },
    computed:{
        formatToYear () {
        return this.annual_date ? moment(this.annual_date).format('YYYY') : ''
      },
      ...mapState({
          loading: state => state.loading,
          reports: state => state.reports
      })
    },
    methods:{
        ...mapActions([
            'generateReports'
        ]),
        capitalize(s){
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        },
        generateReport(){
            let date = () => {
                if(this.report_type == 'Daily'){
                    return this.daily_date
                }
                if(this.report_type == 'Monthly'){
                    return this.monthly_date
                }
                else{
                    return moment(this.annual_date).format('YYYY')
                }
            }
            let data = {
                date: date(),
                report_type: this.report_type
            }

            this.generateReports(data)
        }
    }
  }
</script>