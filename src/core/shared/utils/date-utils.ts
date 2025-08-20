import {
  add,
  sub,
  endOfMonth,
  endOfYear,
  setYear,
  startOfMonth,
  startOfYear,
  format,
  isEqual,
  compareAsc,
  addMilliseconds,
  subMilliseconds,
  isFriday,
  nextMonday,
  parseISO,
  isWeekend,
  parse,
  isValid,
  differenceInDays,
  format as formatDateFns,
  isBefore,
} from 'date-fns';

import { toZonedTime, formatInTimeZone } from 'date-fns-tz';
import { enGB } from 'date-fns/locale';

export enum DaysEnum {
  DOMINGO = 'Domingo',
  SEGUNDA_FEIRA = 'Segunda-feira',
  TERCA_FEIRA = 'Terça-feira',
  QUARTA_FEIRA = 'Quarta-feira',
  QUINTA_FEIRA = 'Quinta-feira',
  SEXTA_FEIRA = 'Sexta-feira',
  SABADO = 'Sábado',
}

class DateUtils {
  static formatDate(date: Date, format: string): string {
    return formatDateFns(date, format);
  }

  static daysMap() {
    const daysMap = new Map<DaysType, number>();
    daysMap.set('Domingo', 1);
    daysMap.set('Segunda-feira', 2);
    daysMap.set('Terça-feira', 3);
    daysMap.set('Quarta-feira', 4);
    daysMap.set('Quinta-feira', 5);
    daysMap.set('Sexta-feira', 6);
    daysMap.set('Sábado', 7);
    return daysMap;
  }

  static differenceInDays(dateLeft: Date, dateRight: Date): number {
    return (
      differenceInDays(this.getUTCDate(dateLeft), this.getUTCDate(dateRight)) *
      -1
    );
  }

  static calendarDaysBetween(
    startDate: Date,
    endDate: Date,
    holidays: Date[],
  ): number {
    let count = 0;
    let currentDate = this.getUTCDate(
      new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
      ),
    );
    const endDateNormalized = this.getUTCDate(
      new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),
    );
    const holidaysNormalized = holidays.map((h) =>
      this.getUTCDate(new Date(h.getFullYear(), h.getMonth(), h.getDate())),
    );

    while (currentDate <= endDateNormalized) {
      const isHoliday = holidaysNormalized.some(
        (holiday) => holiday.getTime() === currentDate.getTime(),
      );

      if (!isHoliday) {
        count++;
      }

      currentDate = this.getUTCDate(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1,
        ),
      );
    }

    return count;
  }

  static businessDaysBetween(
    startDate: Date,
    endDate: Date,
    holidays: Date[],
  ): number {
    let count = 0;
    let currentDate = this.getUTCDate(
      new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
      ),
    );
    const endDateNormalized = this.getUTCDate(
      new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),
    );
    const holidaysNormalized = holidays.map((h) =>
      this.getUTCDate(new Date(h.getFullYear(), h.getMonth(), h.getDate())),
    );

    while (currentDate <= endDateNormalized) {
      const isHoliday = holidaysNormalized.some(
        (holiday) => holiday.getTime() === currentDate.getTime(),
      );

      if (!isWeekend(currentDate) && !isHoliday) {
        count++;
      }

      currentDate = this.getUTCDate(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 1,
        ),
      );
    }

    return count;
  }

  static getCurrentDate(): Date {
    return toZonedTime(new Date(), 'UTC');
  }

  static addTime(date: Date, time: ConfigDate) {
    return addMilliseconds(date, this.convertConfigDateInMilliseconds(time));
  }

  static subTime(date: Date, time: ConfigDate) {
    return subMilliseconds(date, this.convertConfigDateInMilliseconds(time));
  }

  static getUTCDate(date: Date): Date {
    return toZonedTime(date, 'UTC');
  }

  static getCurrentFormattedDate(): string {
    return format(this.getCurrentDate(), 'yyyy-MM-dd');
  }

  static getYear(date: Date = this.getCurrentDate()): string {
    return date.toLocaleString('pt-BR', { year: 'numeric' });
  }

  static getMonth(
    date: Date = this.getCurrentDate(),
    locale = 'en-US',
  ): string {
    return date.toLocaleString(locale, { month: 'long' }).toLowerCase();
  }

  static formatToUTC(date: Date, format: string): string {
    return formatInTimeZone(date, 'UTC', format);
  }

  static startOfMonthUTC(date: Date): Date {
    return this.getUTCDate(startOfMonth(date));
  }

  static setYear(date: Date, year: number): Date {
    return this.getUTCDate(setYear(this.getUTCDate(date), year));
  }

  static endOfMonthUTC(date: Date): Date {
    return this.getUTCDate(endOfMonth(date));
  }

  static startOfYearUTC(year: number): Date {
    const date = setYear(new Date(), year);
    return this.getUTCDate(startOfYear(date));
  }

  static endOfYearUTC(year: number): Date {
    const date = setYear(new Date(), year);
    return this.getUTCDate(endOfYear(date));
  }

  static getUTCMonth(date: Date): number {
    return new Date(date).getUTCMonth();
  }

  static getMonthName(date: Date): string {
    return this.formatToUTC(date, 'MMMM').toLowerCase();
  }

  static toString(date: Date, pattern: string): string {
    return format(date, pattern);
  }

  static removeTimezone(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  static convertConfigDateInMilliseconds(configDate: ConfigDate) {
    const value = Number(configDate.replace(/[a-zA-Z]+/g, ''));
    const prefix = configDate.replace(/\d/g, '') as Prefix;
    const calcOptions = {
      m: (values: number) => values * 60 * 1000,
      h: (values: number) => values * 60 * 60 * 1000,
      d: (values: number) => values * 24 * 60 * 60 * 1000,
    };

    return calcOptions[prefix](value);
  }

  static getDaysNames(language?: 'pt' | 'en'): string[] {
    return language === 'pt'
      ? [
          'Domingo',
          'Segunda-feira',
          'Terça-feira',
          'Quarta-feira',
          'Quinta-feira',
          'Sexta-feira',
          'Sábado',
        ]
      : [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];
  }

  static sortDays(a: DaysType, b: DaysType): number {
    const map = this.daysMap();
    const firstDay = map.get(a) as number;
    const secondDay = map.get(b) as number;
    if (firstDay > secondDay) {
      return 1;
    } else if (firstDay < secondDay) {
      return -1;
    }
    return 0;
  }

  static isValid(date: string): boolean {
    const parsedDate = parse(date, 'yyyy-MM-dd', new Date(), { locale: enGB });
    return isValid(parsedDate);
  }

  static newDate(): Date {
    const currentDateString = this.getCurrentFormattedDate();
    return new Date(currentDateString);
  }

  static compareAsc(dateLeft: Date, dateRight: Date): boolean {
    return compareAsc(dateLeft, dateRight) > 0;
  }

  static isBefore(dateLeft: Date, dateRight: Date): boolean {
    return isBefore(dateLeft, dateRight) || isEqual(dateLeft, dateRight);
  }

  static compareEquals(dateLeft: Date, dateRight: Date): boolean {
    return isEqual(dateLeft, dateRight);
  }

  static addDay(date: Date, days: number): Date {
    return add(date, { days: days });
  }

  static subDay(date: Date, days: number): Date {
    return sub(date, { days: days });
  }

  static isFriday(date: Date | number): boolean {
    return isFriday(date);
  }

  static nextMonday(date: Date) {
    return nextMonday(date);
  }

  static parseISO(date: string): Date {
    return parseISO(date);
  }

  static isWeekend(date: Date): boolean {
    return isWeekend(date);
  }
}

type Prefix = 'm' | 'h' | 'd';
type ConfigDate = `${number}${Prefix}`;

type DaysType =
  | 'Domingo'
  | 'Segunda-feira'
  | 'Terça-feira'
  | 'Quarta-feira'
  | 'Quinta-feira'
  | 'Sexta-feira'
  | 'Sábado';

export { DateUtils, ConfigDate };
