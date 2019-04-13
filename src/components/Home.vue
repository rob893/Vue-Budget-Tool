<template>
    <FdTabs v-model="activeTab">
        <FdTabItem striped label="Budget Tool" name="a" class="content">
            
            <div v-if="budget.getMonthlyExpenses().length > 0">
                <h2>Monthly Expenses</h2>
                <FdTable striped :headers="budgetHeaders" :items="budget.getMonthlyExpenses()">
                    <template slot="row" slot-scope="{ item }">
                        <FdTableRow @click="goToExpense(item.name)">
                            <FdTableCell>{{ item.name }}</FdTableCell>
                            <FdTableCell>${{ item.expense }}</FdTableCell>
                            <FdTableCell><FdButton type="negative" state="normal" @click="budget.removeMonthlyExpense(item)">Delete</FdButton></FdTableCell>
                        </FdTableRow>
                    </template>
                </FdTable>
                <h2>Total Monthly Per Month: ${{ budget.getMonthlySum() }} (${{ budget.getMonthlySum() * 12 }} per year)</h2>
            </div>

            <hr>
            <br>

            <div v-if="budget.getAnnualExpenses().length > 0">
                <h2>Annual Expenses</h2>
                <FdTable striped :headers="budgetHeaders" :items="budget.getAnnualExpenses()">
                    <template slot="row" slot-scope="{ item }">
                        <FdTableRow>
                            <FdTableCell>{{ item.name }}</FdTableCell>
                            <FdTableCell>${{ item.expense }}</FdTableCell>
                            <FdTableCell><FdButton type="negative" state="normal" @click="budget.removeAnnualExpense(item)">Delete</FdButton></FdTableCell>
                        </FdTableRow>
                    </template>
                </FdTable>
                <h2>Total Annual Per Year: ${{ budget.getAnnualSum() }} (${{ (budget.getAnnualSum() / 12).toFixed(2) }} per month)</h2>
            </div>

            <hr>

            <br>
            <h2>Total Yearly Expenses: ${{ budget.getTotalAll() }}</h2>
            <hr>
            <h2>Annual Income: $147000</h2>
            <h2>Remaining Budget: ${{ budget.getRemainingBudget() }}</h2>
            <h2>Remaining Budget Per Month: ${{ budget.getRemainingMonthlyBudget() }}</h2>
            <h2>Remaining Budget Per Week: ${{ budget.getRemainingWeeklyBudget() }}</h2>
            <br>
            
            <hr>

            <FdButton @click.stop="openAddExpense">Add Expense</FdButton>
            <FdButton @click="testApi()">Test API</FdButton>
            <FdModal title="Add Expense" :active.sync="showAddExpense">
                <p>Add an expense.</p>
                <FdFormSet>
                    <FdFormItem label="Name">
                        <FdInput placeholder="Expense Name" :state="nameState === '' ? null : nameState" v-model="newName" />
                    </FdFormItem>
                    <FdFormItem label="Cost">
                        <FdInput placeholder="Expense Cost" type="number" :state="costState === '' ? null : costState" v-model="newCost" />
                    </FdFormItem>
                    <FdFormItem label="Type">
                        <FdSelect v-model="selectType" :state="typeState === '' ? null : typeState">
                            <option value="Annual">Annual</option>
                            <option value="Monthly">Monthly</option>
                        </FdSelect>
                    </FdFormItem>
                </FdFormSet>
                <template slot="actions">
                    <FdButton @click="closeAddExpense()" styling="light">Cancel</FdButton>
                    <FdButton @click="addExpense()" styling="emphasized">Add Expense</FdButton>
                </template>
            </FdModal>
        </FdTabItem>
    </FdTabs>
</template>

<script lang='ts'>
import Vue from "vue";

import { Budget } from "./../classes/Budget";
import { Expense } from "./../classes/Expense";
import { API } from "./../services/API";


export default Vue.extend({
    name: "app",

    data() {
        return {
            budgetHeaders: [
                { label: "Name", sortable: true, sortBy: "name"},
                { label: "Expense", sortable: true, sortBy: "expense"},
                { label: "Delete"},
            ],
            budget: new Budget(),
            activeTab: "a",
            showAddExpense: false,
            selectType: "",
            newName: "",
            newCost: 0,
            nameState: "",
            costState: "",
            typeState: "",
        };
    },

    methods: {
        openAddExpense(): void {
            this.showAddExpense = true;
        },

        closeAddExpense(): void {
            this.nameState = "";
            this.costState = "";
            this.typeState = "";
            this.newCost = 0;
            this.newName = "";
            this.selectType = "";
            this.showAddExpense = false;
        },

        addExpense(): void {
            this.nameState = "";
            this.costState = "";
            this.typeState = "";

            if (this.newName === "") {
                this.nameState = "invalid";
                return;
            }
            
            if (<any>this.newCost === "" || this.newCost < 0) {
                this.costState = "invalid";
                return;
            }

            if (this.selectType === "") {
                this.typeState = "invalid";
                return;
            }

            const newExpense = new Expense(this.newName, Number(this.newCost));

            if (this.selectType === "Annual") {
                this.budget.addAnnualExpense(newExpense);
            } else {
                this.budget.addMonthlyExpense(newExpense);
            }

            this.closeAddExpense();
        },

        goToExpense(id: string): void {
            this.$router.push({name: 'expense', params: { id: id } });
        },

        testApi(): void {
            let data = API.get("./src/services/server.php").then(response => { response });
            console.log(data);
            // API.get("http://localhost/TestApi/").then((value) => {
            //     alert(value);
            // });
        },

        test(): void {
        }
    }
});
</script>
