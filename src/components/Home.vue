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
                            <FdTableCell><FdButton type="negative" state="normal" @click.stop="budget.removeMonthlyExpense(item)">Delete</FdButton></FdTableCell>
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
                        <FdTableRow @click="goToExpense(item.name)">
                            <FdTableCell>{{ item.name }}</FdTableCell>
                            <FdTableCell>${{ item.expense }}</FdTableCell>
                            <FdTableCell><FdButton type="negative" state="normal" @click.stop="budget.removeAnnualExpense(item)">Delete</FdButton></FdTableCell>
                        </FdTableRow>
                    </template>
                </FdTable>
                <h2>Total Annual Per Year: ${{ budget.getAnnualSum() }} (${{ (budget.getAnnualSum() / 12).toFixed(2) }} per month)</h2>
            </div>

            <hr>

            <br>
            <h2>Total Yearly Expenses: ${{ budget.getTotalAll() }}</h2>
            <hr>
            <h2>Annual Income: ${{ budget.annualIncome }}</h2>
            <h2>Remaining Budget: ${{ budget.getRemainingBudget() }}</h2>
            <h2>Remaining Budget Per Month: ${{ budget.getRemainingMonthlyBudget() }}</h2>
            <h2>Remaining Budget Per Week: ${{ budget.getRemainingWeeklyBudget() }}</h2>
            <br>
            
            <hr>

            <FdButton @click.stop="openAddExpense">Add Expense</FdButton>
            <FdButton @click="resetAPIDataToDefault()">Set Default Budget</FdButton>
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
import Vue, { VueConstructor } from "vue";

import { mapGetters } from 'vuex';
import { Budget } from "./../classes/Budget";
import { Expense, ExpenseType } from "./../classes/Expense";
import { API } from "./../services/API";
import TestMixin from './TestMixin';
import mixins, { VueClass } from 'vue-typed-mixins';



export default mixins(TestMixin, (Vue as VueConstructor<Vue & {$refs: {test: string;}}>)).extend({
    name: "app",

    data() {
        return {
            budgetHeaders: [
                { label: "Name", sortable: true, sortBy: "name"},
                { label: "Expense", sortable: true, sortBy: "expense"},
                { label: "Delete"},
            ],
            budget: Budget.Instance,
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
            this.$refs.test = 'butt';
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

            if (this.selectType === "Annual") {
                this.budget.addAnnualExpense(new Expense(this.newName, Number(this.newCost), ExpenseType.Annual));
            } else {
                this.budget.addMonthlyExpense(new Expense(this.newName, Number(this.newCost), ExpenseType.Monthly));
            }

            this.closeAddExpense();
        },

        goToExpense(id: string): void {
            this.$router.push({name: 'expense', params: { id: id } });
        },

        resetAPIDataToDefault(): void {
            API.post("https://rwherber.com/APIs/BudgetTool/index.php", {reset: true}).then((value) => {
                this.budget.reloadAPIData();
                alert("API data reset!");
            });
        }
    },

    computed: {
        ...mapGetters([
            'doubleCounter'
        ])
    }
});
</script>
