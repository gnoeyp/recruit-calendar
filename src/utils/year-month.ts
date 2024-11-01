export class YearMonth {
  private _month: number;
  private _year: number;

  get month(): number {
    return this._month;
  }

  get year(): number {
    return this._year;
  }

  constructor(month: number, year: number) {
    if (month < 1 || month > 12) {
      throw new Error('Month must be between 1 and 12');
    }
    if (year < 0) {
      throw new Error('Year must be greater than 0');
    }
    this._month = month;
    this._year = year;
  }

  nextMonth(): YearMonth {
    const nextMonth = this._month === 12 ? 1 : this._month + 1;
    const nextYear = this._month === 12 ? this._year + 1 : this._year;
    return new YearMonth(nextMonth, nextYear);
  }

  previousMonth(): YearMonth {
    const prevMonth = this._month === 1 ? 12 : this._month - 1;
    const prevYear =
      this._month === 1 ? Math.max(0, this._year - 1) : this._year;
    return new YearMonth(prevMonth, prevYear);
  }

  toString(): string {
    return `${this._year}-${String(this._month).padStart(2, '0')}`;
  }
}
