export class Expense {

    public name: string;
    public expense: number;
    public type: ExpenseType;

    
    public constructor(name: string, expense: number, type: ExpenseType) {
        this.name = name;
        this.expense = expense;
        this.type = type;
    }

    public getAnnualCost(): number {
        if(this.type === ExpenseType.Annual) {
            return this.expense;
        }
        
        return this.expense * 12;
    }

    public getMonthlyCost(): number {
        if(this.type === ExpenseType.Monthly) {
            return this.expense;
        }

        return Number((this.expense / 12).toPrecision(2));
    }

    public getWeeklyCost(): number {
        if(this.type === ExpenseType.Annual) {
            return Number((this.expense / 52).toPrecision(2));
        }

        return Number(((this.expense * 12) / 52).toPrecision(2));
    }
}

export enum ExpenseType {
    Annual = "Annual",
    Monthly = "Monthly"
}
