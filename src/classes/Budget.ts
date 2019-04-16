import jsonData from "../assets/data.json";
import { Expense, ExpenseType } from './Expense';


export class Budget {

    private static instance: Budget;

    private data: any;
    private monthlyExpenses: Expense[] = [];
    private annualExpenses: Expense[] = [];

    
    private constructor() {
        this.data = jsonData;

        for(let i = 0, l = this.data.Monthly.length; i < l; i++) {
            this.monthlyExpenses.push(new Expense(this.data.Monthly[i].name, this.data.Monthly[i].expense, ExpenseType.Monthly));
        }

        for(let i = 0, l = this.data.Annual.length; i < l; i++) {
            this.annualExpenses.push(new Expense(this.data.Annual[i].name, this.data.Annual[i].expense, ExpenseType.Annual));
        }
    }

    public static get Instance() {
        return this.instance || (this.instance = new Budget());
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

    public getAnnualExpense(name: string): Expense | null {
        for(let i = 0, l = this.annualExpenses.length; i < l; i++) {
            if(this.annualExpenses[i].name === name) {
                return this.annualExpenses[i];
            }
        }

        return null;
    }

    public getMonthlyExpense(name: string): Expense | null {
        for(let i = 0, l = this.monthlyExpenses.length; i < l; i++) {
            if(this.monthlyExpenses[i].name === name) {
                return this.monthlyExpenses[i];
            }
        }

        return null;
    }

    public getExpense(name: string): Expense | null {
        
        if(this.getAnnualExpense(name) !== null) {
            return this.getAnnualExpense(name);
        }
        else if(this.getMonthlyExpense(name) !== null) {
            return this.getMonthlyExpense(name);
        }
        
        return null;
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

    public getRemainingWeeklyBudget(): number {
        return Number((this.getRemainingBudget() / 52).toFixed(2));
    }
}
