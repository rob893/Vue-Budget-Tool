<template>
    <div id="app">
        <FdShell>
            <FdShellHeader>
                <FdShellBar>
                    <FdShellBarGroup position="start">
                    <FdShellBarProduct>
                        <FdShellBarProductMenu>
                            <template slot="title">Budget Tool</template>
                        </FdShellBarProductMenu>
                    </FdShellBarProduct>
                    </FdShellBarGroup>
                    <FdShellBarGroup position="end">
                    <FdShellBarActions>
                        <FdShellBarAction>
                        <FdShellBarUserMenu>
                        </FdShellBarUserMenu>
                        </FdShellBarAction>
                        <FdShellBarAction>
                        <FdShellBarProductSwitcher>
                            <FdShellBarProductSwitcherItem>
                            </FdShellBarProductSwitcherItem>
                            <FdShellBarProductSwitcherItem>
                            </FdShellBarProductSwitcherItem>
                        </FdShellBarProductSwitcher>
                        </FdShellBarAction>
                    </FdShellBarActions>
                    </FdShellBarGroup>
                </FdShellBar>
            </FdShellHeader>

            <FdAppMain>
                <FdTabs v-model="activeTab">
                    <FdTabItem striped label="Budget Tool" name="a" class="content">
                        
                        <div v-if="budget.getMonthlyExpenses().length > 0">
                            <h2>Monthly Expenses</h2>
                            <FdTable striped :headers="budgetHeaders" :items="budget.getMonthlyExpenses()">
                                <template slot="row" slot-scope="{ item }">
                                    <FdTableRow>
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
                        <br>
                        
                        <hr>

                        <FdButton @click.stop="openAddExpense">Add Expense</FdButton>
                        <FdModal title="Add Expense" :active.sync="showAddExpense">
                            <p>Add an expense.</p>
                            <FdFormSet>
                                <FdFormItem label="Name">
                                    <FdInput placeholder="Expense Name" :state="nameState" v-model="newName" />
                                </FdFormItem>
                                <FdFormItem label="Cost">
                                    <FdInput placeholder="Expense Cost" type="number" :state="costState" v-model="newCost" />
                                </FdFormItem>
                                <FdFormItem label="Type">
                                    <FdSelect v-model="selectType" :state="typeState">
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
            </FdAppMain>
        </FdShell>
    </div>
</template>

<script lang='ts'>
import Vue from "vue";

import { Budget } from "./assets/Budget";
import { Expense } from "./assets/Expense";


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
            selectType: null,
            newName: null,
            newCost: null,
            nameState: null,
            costState: null,
            typeState: null,
        };
    },

    methods: {
        openAddExpense(): void {
            this.showAddExpense = true;
        },

        closeAddExpense(): void {
            this.nameState = null;
            this.costState = null;
            this.typeState = null;
            this.newCost = null;
            this.newName = null;
            this.selectType = null;
            this.showAddExpense = false;
        },

        addExpense(): void {
            this.nameState = null;
            this.costState = null;
            this.typeState = null;

            if (this.newName === null) {
                this.nameState = "invalid";
                return;
            }

            if (this.newCost === null) {
                this.costState = "invalid";
                return;
            }

            if (this.selectType === null) {
                this.typeState = "invalid";
                return;
            }

            const newExpense = new Expense(this.newName, this.newCost);

            if (this.selectType === "Annual") {
                this.budget.addAnnualExpense(newExpense);
            } else {
                this.budget.addMonthlyExpense(newExpense);
            }

            this.closeAddExpense();
        },
    }
});
</script>

<style>
.content {
    padding: 10px 10px 10px 10px;
}
</style>

