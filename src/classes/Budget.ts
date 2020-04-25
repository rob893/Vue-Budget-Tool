import { Expense, ExpenseType } from "./Expense";
import { API } from "@/services/API";

export class Budget {
  public annualIncome: number = 0;

  private static instance: Budget;

  private data: any;
  private monthlyExpenses: Expense[] = [];
  private annualExpenses: Expense[] = [];

  private constructor() {
    API.get("https://rwherber.com/APIs/BudgetTool/index.php").then((data) => {
      this.data = data;

      this.annualIncome = this.data.AnnualIncome;

      for (let i = 0, l = this.data.Monthly.length; i < l; i++) {
        this.monthlyExpenses.push(
          new Expense(
            this.data.Monthly[i].name,
            this.data.Monthly[i].expense,
            ExpenseType.Monthly
          )
        );
      }

      for (let i = 0, l = this.data.Annual.length; i < l; i++) {
        this.annualExpenses.push(
          new Expense(
            this.data.Annual[i].name,
            this.data.Annual[i].expense,
            ExpenseType.Annual
          )
        );
      }
    });
  }

  public static get Instance() {
    return this.instance || (this.instance = new Budget());
  }

  public reloadAPIData(): void {
    this.monthlyExpenses = [];
    this.annualExpenses = [];
    this.data = null;

    API.get("https://rwherber.com/APIs/BudgetTool/index.php").then((data) => {
      this.data = data;

      for (let i = 0, l = this.data.Monthly.length; i < l; i++) {
        this.monthlyExpenses.push(
          new Expense(
            this.data.Monthly[i].name,
            this.data.Monthly[i].expense,
            ExpenseType.Monthly
          )
        );
      }

      for (let i = 0, l = this.data.Annual.length; i < l; i++) {
        this.annualExpenses.push(
          new Expense(
            this.data.Annual[i].name,
            this.data.Annual[i].expense,
            ExpenseType.Annual
          )
        );
      }
    });
  }

  public addAnnualExpense(expense: Expense): void {
    this.annualExpenses.push(expense);

    let data = {
      Annual: {
        name: expense.name,
        expense: expense.expense,
      },
    };

    API.post("https://rwherber.com/APIs/BudgetTool/index.php", data);
  }

  public removeAnnualExpense(expense: Expense): void {
    for (let i = 0; i < this.annualExpenses.length; i++) {
      if (this.annualExpenses[i].name === expense.name) {
        this.annualExpenses.splice(i, 1);
      }
    }

    let data = {
      Delete: expense.name,
      From: "Annual",
    };

    API.post("https://rwherber.com/APIs/BudgetTool/index.php", data);
  }

  public addMonthlyExpense(expense: Expense): void {
    this.monthlyExpenses.push(expense);

    let data = {
      Monthly: {
        name: expense.name,
        expense: expense.expense,
      },
    };

    API.post("https://rwherber.com/APIs/BudgetTool/index.php", data);
  }

  public removeMonthlyExpense(expense: Expense): void {
    for (let i = 0; i < this.monthlyExpenses.length; i++) {
      if (this.monthlyExpenses[i].name === expense.name) {
        this.monthlyExpenses.splice(i, 1);
      }
    }

    let data = {
      Delete: expense.name,
      From: "Monthly",
    };

    API.post("https://rwherber.com/APIs/BudgetTool/index.php", data);
  }

  public getAnnualExpense(name: string): Expense | null {
    for (let i = 0, l = this.annualExpenses.length; i < l; i++) {
      if (this.annualExpenses[i].name === name) {
        return this.annualExpenses[i];
      }
    }

    return null;
  }

  public getMonthlyExpense(name: string): Expense | null {
    for (let i = 0, l = this.monthlyExpenses.length; i < l; i++) {
      if (this.monthlyExpenses[i].name === name) {
        return this.monthlyExpenses[i];
      }
    }

    return null;
  }

  public getExpense(name: string): Expense | null {
    if (this.getAnnualExpense(name) !== null) {
      return this.getAnnualExpense(name);
    } else if (this.getMonthlyExpense(name) !== null) {
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
    return this.getAnnualSum() + this.getMonthlySum() * 12;
  }

  public getRemainingBudget(): number {
    return this.annualIncome - this.getTotalAll();
  }

  public getRemainingMonthlyBudget(): number {
    return Number((this.getRemainingBudget() / 12).toFixed(2));
  }

  public getRemainingWeeklyBudget(): number {
    return Number((this.getRemainingBudget() / 52).toFixed(2));
  }
}
