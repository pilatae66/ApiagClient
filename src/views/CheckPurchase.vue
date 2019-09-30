<template>
<div>
    <v-card
        width="100vw"
        class="mx-auto"
    >   
        <v-card-title class="subtitle-2 float-right font-weight-thin">CAF#123123</v-card-title>
        <v-container class="pa-12" fluid>
            <v-row>
                <v-col class="text-center">
                    <img src="../images/logo.jpg" alt="" srcset="" style="height: 70px; width: 70px"><br/>
                    <span class="text-uppercase subtitle-1 font-weight-light">Unistart Credit And Finance Corporation</span><br />
                    <span class="text-uppercase subtitle-1 font-weight-light">Credit Application Form (CAF)</span><br />
                    <span class="text-uppercase subtitle-2 font-weight-light">Credit and Collection Department</span>
                </v-col>
            </v-row>
            <v-row class="mt-12">
                <v-col cols="6" class="my-0 py-0">
                    <span class="font-weight-light"><b>Application Type:</b> NEW</span><br>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="6" class="my-0 py-0">
                    <span class="font-weight-light"><b>Application Date:</b> 2019-09-30</span><br>
                    <span class="font-weight-light"><b>Borrower Type:</b> Maker</span><br>
                </v-col>
            </v-row>
            <span class="title">Personal Details</span>
            <v-row class="mt-5">
                <!-- Left Side of the page -->
                <v-col cols="6" class="my-1 py-1">
                    <span class="font-weight-light"><b>Full Name:</b><br> Mr. Charlie Lagria Cortez</span><br>
                    <span class="font-weight-light"><b>Permanent Address:</b><br> Del Carmen, Iligan City, Philippines 9200</span><br>
                    <span class="font-weight-light"><b>Present Address:</b><br> Del Carmen, Iligan City, Philippines 9200</span><br><br>
                    <v-row>
                        <v-col cols="4" class="my-1 py-1">
                            <span class="font-weight-light"><b>Mobile Number:</b><br> +637584563215</span>
                        </v-col>
                        <v-col cols="4" class="my-1 py-1">
                            <span class="font-weight-light"><b>Landline Number:</b><br> (163)542-6542</span>
                        </v-col>
                        <v-col cols="4" class="my-1 py-1">
                            <span class="font-weight-light"><b>Employment Type:</b><br> OFW Beneficiary</span><br><br>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6" class="my-1 py-1">
                            <span class="font-weight-light"><b>Father's Name:</b><br> Garlito Pitao Contes</span>
                        </v-col>
                        <v-col cols="6" class="my-1 py-1">
                            <span class="font-weight-light"><b>Mother's Name:</b><br> Genara Liray Lagria</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6" class="my-1 py-1">
                            <span class="font-weight-light"><b>Spouse's Name:</b><br> Maria Olivia Bohol Balucos</span><br><br>
                        </v-col>
                    </v-row>
                    
                </v-col>
                <!-- Right Side of the page -->
                <v-col cols="6" class="my-1 py-1">
                    <v-row>
                        <v-col cols="4" class="my-1 py-1">
                            <span class="font-weight-light"><b>Date of Birth:</b><br> 1991-15-11</span>
                        </v-col>
                        <v-col cols="4" class="my-1 py-1">
                            <span class="font-weight-light"><b>Age:</b> 28</span>
                        </v-col>
                        <v-col cols="4" class="my-1 py-1">
                            <span class="font-weight-light"><b>Place of Birth:</b><br> Iligan City</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4" class="my-1 py-1">
                            <span class="font-weight-light"><b>Civil Status:</b><br> Single</span>
                        </v-col>
                        <v-col cols="4" class="my-1 py-1">
                            <span class="font-weight-light"><b>Religion:</b><br> Roman Catholic</span>
                        </v-col>
                        <v-col cols="4" class="my-1 py-1">
                            <span class="font-weight-light"><b>E-mail:</b> pilatae66@gmail.com</span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="5" class="my-1 py-1">
                            <span class="font-weight-light"><b>Education Attainment:</b><br> Highschool Grad</span><br><br>
                        </v-col>
                        <v-col cols="3" class="my-1 py-1">
                            <span class="font-weight-light"><b>Profession:</b><br> Engineer</span><br><br>
                        </v-col>
                        <v-col cols="4" class="my-1 py-1">
                            <span class="font-weight-light"><b>Employement Type:</b><br> Self-Employed</span><br><br>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" class="my-1 py-1">
                            <span>Dependents</span>
                            <v-simple-table>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-left">Name</th>
                                            <th class="text-left">Age</th>
                                            <th class="text-left">Profession</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Marifer</td>
                                            <td>14 yrs old</td>
                                            <td>N/A</td>
                                        </tr>
                                        <tr>
                                            <td>Dave</td>
                                            <td>11 yrs old</td>
                                            <td>N/A</td>
                                        </tr>
                                        <tr>
                                            <td>Tamara</td>
                                            <td>7 yrs old</td>
                                            <td>N/A</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <div v-show="false">
                <span class="title">Business Details</span>
                <v-row>
                    <v-col cols="6" class="my-1 py-1">
                        <span class="font-weight-light"><b>Business Name:</b> Cotton Candy Vendor</span>
                    </v-col>
                    <v-col cols="6" class="my-1 py-1">
                        <span class="font-weight-light"><b>Nature of Business:</b> Street Vending</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4" class="my-1 py-1">
                        <span class="font-weight-light"><b>Business Address:</b> Iligan City</span>
                    </v-col>
                    <v-col cols="4" class="my-1 py-1">
                        <span class="font-weight-light"><b>Mobile Number:</b> +639785462845</span>
                    </v-col>
                    <v-col cols="4" class="my-1 py-1">
                        <span class="font-weight-light"><b>Landline Number:</b> (063) 511-4542</span>
                    </v-col>
                </v-row>
            </div>
            <div v-show="true">
                <span class="title">Employment and Business Information</span>
                <v-row>
                    <v-col cols="6" class="my-1 py-1">
                        <span class="font-weight-light"><b>Type of Organization:</b> Cooperative</span>
                    </v-col>
                    <v-col cols="6" class="my-1 py-1">
                        <span class="font-weight-light"><b>Employment Status:</b> Probitionary</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6" class="my-1 py-1">
                        <span class="font-weight-light"><b>Employer Name:</b> Infinite Points Philippines Inc.</span>
                    </v-col>
                    <v-col cols="6" class="my-1 py-1">
                        <span class="font-weight-light"><b>Employment Address:</b> Iligan City</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6" class="my-1 py-1">
                        <span class="font-weight-light"><b>Mobile Number:</b> +639751522154</span>
                    </v-col>
                    <v-col cols="6" class="my-1 py-1">
                        <span class="font-weight-light"><b>Landline Number:</b> (063) 511-4542</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="5" class="my-1 py-1">
                        <span class="font-weight-light"><b>Nature of Business:</b> BPO Company</span>
                    </v-col>
                    <v-col cols="4" class="my-1 py-1" style="padding-left:95px">
                        <span class="font-weight-light"><b>Position:</b> Web Developer</span>
                    </v-col>
                    <v-col cols="3" class="my-1 py-1" style="padding-left:90px">
                        <span class="font-weight-light"><b>Length of Stay:</b><br> 2 years</span>
                    </v-col>
                </v-row>
            </div>
            <span class="title">Financial Information</span>
            <v-row>
                <v-col cols="6">
                    <span class="subtitle">Income</span>
                    <v-simple-table style="border: 1px solid silver">
                        <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">Source of Income</th>
                                <th class="text-left">Maker</th>
                                <th class="text-left">Spouse</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Gross Monthly Salary / Business <br> Other sources (Please Specify)</td>
                                <td>123</td>
                                <td>123</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>TOTAL GROSS MONTHLY INCOME</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>COMBINED MONTHLY INCOME</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
                <v-col cols="6">
                    <span class="subtitle">Liabilities</span>
                    <v-simple-table style="border: 1px solid silver">
                        <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">Description of Expenses</th>
                                <th class="text-left">Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Rent Expense</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Household Expenses</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Education / Tuition Expenses</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Other Expenses</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Loan</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Total Expenses</td>
                                <td></td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <span class="title">References</span>
                     <v-simple-table>
                        <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">Name</th>
                                <th class="text-left">Address(Complete Address with ZIP Code</th>
                                <th class="text-left">Contact Number</th>
                                <th class="text-left">Relation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Hydee Alquizar</td>
                                <td>Del Carmen, Iligan City</td>
                                <td>09196132074</td>
                                <td>Sister</td>
                            </tr>
                            <tr>
                                <td>Fe Gabriel</td>
                                <td>Del Carmen, Iligan City</td>
                                <td>09196132074</td>
                                <td>Neighbor</td>
                            </tr>
                            <tr>
                                <td>Cherymel Candeso</td>
                                <td>Del Carmen, Iligan City</td>
                                <td>09196132074</td>
                                <td>Neighbor</td>
                            </tr>
                        </tbody>
                        </template>
                    </v-simple-table>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="text-center">
                    <span class="title text-uppercase text-center">undertaking</span>
                </v-col>
                <v-col cols="12" class="text-center text-uppercase">i hereby certify that all information are true and correct to the best of my knowledge and belief, that above information is given with express permission for the purpose of obtaining credit from unistar credit and finance corporation. i hereby authorize unistar credit and finance corporation through it's authorized representative to conduct verification of information given may cancel or disapprove on the ground of misrepresentation of information. </v-col>
                <v-col cols="12" class="text-center text-uppercase">should this applicant be denied, unistar credit and finance corporation is under no obligation to furnish the result of investigation.</v-col>
                <v-row style="margin-top: 100px">
                    <v-col cols="6" class="text-center my-0 py-0">
                        <span class="subtitle-2 text-uppercase">___________________________________________________________________</span>
                    </v-col>
                    <v-col cols="6" class="text-center my-0 py-0">
                        <span class="subtitle-2 text-uppercase">__________________________________________</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6" class="text-center my-0 py-0">
                        <span class="subtitle-2 text-uppercase">signature over printed name of the applicant</span>
                    </v-col>
                    <v-col cols="6" class="text-center my-0 py-0">
                        <span class="subtitle-2 text-uppercase">date</span>
                    </v-col>
                </v-row>
            </v-row>
        </v-container>
    </v-card>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>