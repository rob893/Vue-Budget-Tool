<template>
    <div id="app">
        <FdShell>
            <FdShellHeader>
                <FdShellBar>
                    <FdShellBarGroup position="start">
                    <FdShellBarProduct>
                        <FdShellBarProductMenu>
                            <template slot="title">Budget Tool</template>
                            <template slot="menu">
                                <FdMenuItem>Application A</FdMenuItem>
                                <FdMenuItem>Application B</FdMenuItem>
                            </template>
                        </FdShellBarProductMenu>
                    </FdShellBarProduct>
                    <FdShellBarSubtitle>Subtitle</FdShellBarSubtitle>
                    </FdShellBarGroup>
                    <FdShellBarGroup position="end">
                    <FdShellBarActions>
                        <FdShellBarAction>
                        <FdShellBarUserMenu>
                            <FdMenuItem>App Finder</FdMenuItem>
                            <FdMenuItem>Settings</FdMenuItem>
                            <FdMenuItem>App Settings</FdMenuItem>
                            <FdMenuItem>Help</FdMenuItem>
                            <FdMenuItem>Give Feedback</FdMenuItem>
                            <FdMenuItem>About</FdMenuItem>
                            <FdMenuItem>Sign out</FdMenuItem>
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
                            <h2>Total Monthly Per Month: ${{ budget.getMonthlySum() }}</h2>
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
                            <h2>Total Annual Per Year: ${{ budget.getAnnualSum() }}</h2>
                        </div>

                        <hr>

                        <br>
                        <h2>Total Yearly Expenses: ${{ budget.getTotalAll() }}</h2>
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

                    <FdTabItem label="Demo" name="b" class="content">
                        <FdPopover v-margin:large>
                            <h1 v-margin:large slot="body">🚀 Hello Fundamental Vue 🚀</h1>
                        </FdPopover>
                        <FdIcon name="lead" size="l" />

                        <FdButton @click.stop="showModal">Show Modal</FdButton>
                        <FdModal title="Modal Title" :active.sync="isModalActive">
                            <p>Do you want to invite your friends to join the party?</p>
                            <template slot="actions">
                                <FdButton @click="closeModal" styling="light">Cancel</FdButton>
                                <FdButton @click="closeModal" styling="emphasized">Invite Friends</FdButton>
                            </template>
                        </FdModal>
                        <FdTimePicker />

                        <FdPopover v-margin:large title="Show Calendar">
                            <FdCalendar slot="body" />
                        </FdPopover>
                        
                        <FdSpinner/>

                        <FdTable striped :headers="headers" :items="items">
                            <template slot="row" slot-scope="{ item }">
                            <FdTableRow>
                                <FdTableCell>{{ item.firstName }}</FdTableCell>
                                <FdTableCell>{{ item.lastName }}</FdTableCell>
                                <FdTableCell>{{ item.building }}</FdTableCell>
                            </FdTableRow>
                            </template>
                        </FdTable>
                    </FdTabItem>
                </FdTabs>
            </FdAppMain>
        </FdShell>
    </div>
</template>

<script>
import { Budget, Expense } from './assets/classes.js';


export default {
    name: 'app',

    data () {
        return {
            isModalActive: false,
            headers: [ 
                { label: "First Name", sortable: true, sortBy: "firstName" },
                { label: "Last Name", sortable: true, sortBy: "lastName" },
                { label: "Building", sortable: true, sortBy: "building" }
            ],
            items: [
                { rating: 1, firstName: "Chris", lastName: "Kienle", building: "WFD02" },
                { rating: 2, firstName: "Andi", lastName: "Kienle", building: "WFD03" },
                { rating: 3, firstName: "Sven", lastName: "Bacia", building: "WFD02" },
                { rating: 4, firstName: "Artur", lastName: "Raess", building: "WFD02" }
            ],
            budgetHeaders: [
                { label: "Name", sortable: true, sortBy: "name"},
                { label: "Expense", sortable: true, sortBy: "expense"},
                { label: "Delete"}
            ],
            budget: new Budget(),
            activeTab: "a",
            showAddExpense: false,
            selectType: null,
            newName: null,
            newCost: null,
            nameState: null,
            costState: null,
            typeState: null
        }
    },

    methods: {
        showModal() {
            this.isModalActive = true;
        },

        closeModal() {
            this.isModalActive = false;
        },

        openAddExpense() {
            this.showAddExpense = true;
        },

        closeAddExpense() {
            this.nameState = null;
            this.costState = null;
            this.typeState = null;
            this.newCost = null;
            this.newName = null;
            this.selectType = null;
            this.showAddExpense = false;
        },

        addExpense() {
            this.nameState = null;
            this.costState = null;
            this.typeState = null;

            if(this.newName === null) {
                this.nameState = "invalid";
                return;
            }

            if(this.newCost === null) {
                this.costState = "invalid";
                return;
            }

            if(this.selectType === null) {
                this.typeState = "invalid";
                return;
            }

            let newExpense = new Expense(this.newName, this.newCost);

            if(this.selectType == "Annual") {
                this.budget.addAnnualExpense(newExpense);
            }
            else {
                this.budget.addMonthlyExpense(newExpense);
            }

            this.closeAddExpense()
        }
    },

    mounted() {
    }
}
</script>

<style>
.content {
    padding: 10px 10px 10px 10px;
}
</style>

