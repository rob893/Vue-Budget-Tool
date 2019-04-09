import jsonData from './data.json';


export class Budget {

    constructor(){
        this.data = jsonData;
        this.monthlyExpenses = this.data.Monthly;
        this.annualExpenses = this.data.Annual;
    }

    addAnnualExpense(expense) {
        this.annualExpenses.push(expense);
    }

    removeAnnualExpense(expense) {
        for(let i = 0; i < this.annualExpenses.length; i++) {
            if(this.annualExpenses[i].name == expense.name) {
                this.annualExpenses.splice(i, 1);
            }
        }
    }

    addMonthlyExpense(expense) {
        this.monthlyExpenses.push(expense);
    }

    removeMonthlyExpense(expense) {
        for(let i = 0; i < this.monthlyExpenses.length; i++) {
            if(this.monthlyExpenses[i].name == expense.name) {
                this.monthlyExpenses.splice(i, 1);
            }
        }
    }

    getAnnualExpenses() {
        return this.annualExpenses;
    }

    getMonthlyExpenses() {
        return this.monthlyExpenses;
    }

    getMonthlySum() {
        let sum = 0;

        for(let i = 0; i < this.monthlyExpenses.length; i++) {
            sum += this.monthlyExpenses[i].expense;
        }

        return sum;
    }

    getAnnualSum() {
        let sum = 0;

        for(let i = 0; i < this.annualExpenses.length; i++) {
            sum += this.annualExpenses[i].expense;
        }

        return sum;
    }

    getTotalAll() {
        return this.getAnnualSum() + (this.getMonthlySum() * 12);
    }

    getRemainingBudget() {
        return 147000 - this.getTotalAll();
    }

    getRemainingMonthlyBudget() {
        return (this.getRemainingBudget() / 12).toFixed(2);
    }
}

export class Expense {

    public name: string;
    public expense: number;

    constructor(name: string, expense: number) {
        this.name = name;
        this.expense = expense;
    }
}