import jsonData from "../assets/data.json";
import { Expense } from './Expense.js';


export class Budget {

    private data: any;
    private monthlyExpenses: Expense[];
    private annualExpenses: Expense[];

    
    public constructor() {
        this.data = jsonData;
        this.monthlyExpenses = this.data.Monthly;
        this.annualExpenses = this.data.Annual;
    }

    public addAnnualExpense(expense: Expense): void {
        this.annualExpenses.push(expense);
    }

    public removeAnnualExpense(expense: Expense): void {
        for (let i = 0; i < this.annualExpenses.length; i++) {
            if (this.annualExpenses[i].name === expense.name) {
                this.annualExpenses.splice(i, 1);
            }
        }
    }

    public addMonthlyExpense(expense: Expense): void {
        this.monthlyExpenses.push(expense);
    }

    public removeMonthlyExpense(expense: Expense): void {
        for (let i = 0; i < this.monthlyExpenses.length; i++) {
            if (this.monthlyExpenses[i].name === expense.name) {
                this.monthlyExpenses.splice(i, 1);
            }
        }
    }

    public getAnnualExpenses(): Expense[] {
        return this.annualExpenses;
    }

    public getMonthlyExpenses(): Expense[] {
        return this.monthlyExpenses;
    }

    public getMonthlySum(): number {
        let sum: number = 0;

        for (let i = 0; i < this.monthlyExpenses.length; i++) {
            sum += this.monthlyExpenses[i].expense;
        }

        return sum;
    }

    public getAnnualSum(): number {
        let sum: number = 0;

        for (let i = 0; i < this.annualExpenses.length; i++) {
            sum += this.annualExpenses[i].expense;
        }

        return sum;
    }

    public getTotalAll(): number {
        return this.getAnnualSum() + (this.getMonthlySum() * 12);
    }

    public getRemainingBudget(): number {
        return 147000 - this.getTotalAll();
    }

    public getRemainingMonthlyBudget(): number {
        return Number((this.getRemainingBudget() / 12).toFixed(2));
    }
}