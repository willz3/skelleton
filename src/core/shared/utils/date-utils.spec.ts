import { DateUtils as sut } from './date-utils';

describe('Utils - Date', () => {
  it('Should return current date with UTC timezone', () => {
    const currentDateUTC = sut.getCurrentDate();
    expect(currentDateUTC).toBeDefined();
    expect(currentDateUTC).toBeInstanceOf(Date);
  });

  it('Should return month name in pt-BR', () => {
    const date = new Date(2022, 1, 1);
    const monthName = sut.getMonth(date, 'pt-BR');
    expect(monthName).toEqual('fevereiro');
  });

  it('Should return month name in en-US for default', () => {
    const date = new Date(2022, 1, 1);
    const monthName = sut.getMonth(date);
    expect(monthName).toEqual('february');
  });

  it('Should return days of the week in EN if no language is provided', () => {
    const daysNames = sut.getDaysNames();
    expect(daysNames).toEqual([
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]);
  });

  it('Should return days of the week in EN', () => {
    const daysNames = sut.getDaysNames('en');
    expect(daysNames).toEqual([
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]);
  });

  it('Should return days of the week in pt', () => {
    const daysNames = sut.getDaysNames('pt');
    expect(daysNames).toEqual([
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ]);
  });

  it('Should return a map with all days of the week with they orders', () => {
    const daysMap = new Map<string, number>();
    daysMap.set('Domingo', 1);
    daysMap.set('Segunda-feira', 2);
    daysMap.set('Terça-feira', 3);
    daysMap.set('Quarta-feira', 4);
    daysMap.set('Quinta-feira', 5);
    daysMap.set('Sexta-feira', 6);
    daysMap.set('Sábado', 7);

    expect(sut.daysMap()).toEqual(daysMap);
  });

  it('Should add minutes to date', () => {
    const dateFrom = new Date(2022, 0, 1, 12, 0, 0, 0);
    const dateTo = new Date(2022, 0, 1, 12, 6, 0, 0);
    const dateResult = sut.addTime(dateFrom, '6m');
    expect(dateResult).toEqual(dateTo);
  });

  it('Should set year correctly', () => {
    const dateFrom = new Date(2022, 0, 1, 12, 0, 0, 0);
    const dateTo = new Date(2023, 0, 1, 12, 0, 0, 0);
    const dateResult = sut.setYear(dateFrom, dateFrom.getFullYear() + 1);
    expect(dateResult).toEqual(dateTo);
  });

  it('Should return the difference between two dates in days.', () => {
    const date1 = new Date(2024, 9, 20);
    const date2 = new Date(2024, 11, 16);
    const difference = sut.differenceInDays(date1, date2);
    expect(difference).toEqual(57);
  });

  it('Should sub minutes to date', () => {
    const dateFrom = new Date(2022, 0, 1, 12, 0, 0, 0);
    const dateTo = new Date(2022, 0, 1, 12, -6, 0, 0);
    const dateResult = sut.subTime(dateFrom, '6m');
    expect(dateResult).toEqual(dateTo);
  });

  it('Should add hours to date', () => {
    const dateFrom = new Date(2022, 0, 1, 2, 0, 0, 0);
    const dateTo = new Date(2022, 0, 1, 5, 0, 0, 0);
    const dateResult = sut.addTime(dateFrom, '3h');
    expect(dateResult).toEqual(dateTo);
  });

  it('Should sub hours to date', () => {
    const dateFrom = new Date(2022, 0, 1, 2, 0, 0, 0);
    const dateTo = new Date(2022, 0, 1, -1, 0, 0, 0);
    const dateResult = sut.subTime(dateFrom, '3h');
    expect(dateResult).toEqual(dateTo);
  });

  it('Should add days to date', () => {
    const dateFrom = new Date(2022, 0, 1, 5, 0, 0, 0);
    const dateTo = new Date(2022, 0, 2, 5, 0, 0, 0);
    const dateResult = sut.addTime(dateFrom, '1d');
    expect(dateResult).toEqual(dateTo);
  });

  it('Should sub days to date', () => {
    const dateFrom = new Date(2022, 0, 1, 5, 0, 0, 0);
    const dateTo = new Date(2022, 0, 0, 5, 0, 0, 0);
    const dateResult = sut.subTime(dateFrom, '1d');
    expect(dateResult).toEqual(dateTo);
  });

  it('Should return UTC from date', () => {
    const dateUTC = new Date();
    expect(sut.getUTCDate(dateUTC).getDate()).toEqual(dateUTC.getDate());
  });

  it('Should return year of date that was sent', () => {
    const date = new Date();
    expect(sut.getYear(date)).toEqual(String(date.getFullYear()));
  });

  it('Should return year of date', () => {
    expect(sut.getYear()).toEqual(String(new Date().getFullYear()));
  });

  it('Should return a name month of the date', () => {
    const date = new Date();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    expect(sut.getMonthName(date)).toEqual(
      monthNames[date.getUTCMonth()].toLowerCase(),
    );
  });

  it('Should return a UTC month of the date', () => {
    const date = new Date();

    expect(sut.getUTCMonth(date)).toEqual(date.getUTCMonth());
  });

  it('Should sort days and return 1 if first day is bigger than second day', () => {
    const retorno = sut.sortDays('Segunda-feira', 'Domingo');
    expect(retorno).toEqual(1);
  });

  it('Should sort days and return -1 if first day is smaller than second day', () => {
    const retorno = sut.sortDays('Segunda-feira', 'Terça-feira');
    expect(retorno).toEqual(-1);
  });

  it('Should sort days and return 0 if first day equals second day', () => {
    const retorno = sut.sortDays('Segunda-feira', 'Segunda-feira');
    expect(retorno).toEqual(0);
  });

  it('Should return start of mounth', () => {
    const data = new Date(2022, 0, 1, 0, 0, 0, 0);
    const retorno = sut.startOfMonthUTC(data);
    expect(sut.getUTCDate(data)).toEqual(retorno);
  });

  it('Should return end of mounth', () => {
    const data = new Date(2022, 0, 32, 0, 0, 0, -1);
    const retorno = sut.endOfMonthUTC(data);
    expect(sut.getUTCDate(data)).toEqual(retorno);
  });

  it('Should return end of year', () => {
    const data = new Date(2022, 11, 32, 0, 0, 0, -1);
    const retorno = sut.endOfYearUTC(2022);
    expect(sut.getUTCDate(data)).toEqual(retorno);
  });

  it('Should return start of year', () => {
    const data = new Date(2022, 0, 1, 0, 0, 0, 0);
    const retorno = sut.startOfYearUTC(2022);
    expect(sut.getUTCDate(data)).toEqual(retorno);
  });

  it('Should format a current date to yyyy-MM-dd', () => {
    const regex = /(\d{4})[-](\d{2})[-](\d{2})/;
    const dateFormatted = sut.getCurrentFormattedDate();
    expect(regex.test(dateFormatted)).toBeTruthy();
  });

  it('Should return a formatted date with correct format', () => {
    const data = new Date(2022, 0, 1);
    const formattedData = sut.toString(data, 'yyyy-MM-dd');
    expect(formattedData).toEqual('2022-01-01');
  });

  it('Should return true if left date is bigger than the right date', () => {
    const leftDate = new Date(2022, 0, 10);
    const rightDate = new Date(2022, 0, 1);
    const dateCompare = sut.compareAsc(leftDate, rightDate);
    expect(dateCompare).toBeTruthy();
  });

  it('Should return false if left date is smaller than the right date', () => {
    const leftDate = new Date(2022, 0, 1);
    const rightDate = new Date(2022, 0, 10);
    const dateCompare = sut.compareAsc(leftDate, rightDate);
    expect(dateCompare).toBeFalsy();
  });

  it('Should return the start date plus one day', () => {
    const dateInitial = new Date(2022, 0, 1);
    const dateFinish = new Date(2022, 0, 2);
    const dateReturn = sut.addDay(dateInitial, 1);
    expect(dateReturn).toEqual(dateFinish);
  });

  it('Should return the start date minus one day', () => {
    const dateInitial = new Date(2022, 0, 2);
    const dateFinish = new Date(2022, 0, 1);
    const dateReturn = sut.subDay(dateInitial, 1);
    expect(dateReturn).toEqual(dateFinish);
  });

  it('Should return true if two dates are equal', () => {
    const dateInitial = new Date(2022, 0, 1);
    const dateFinish = new Date(2022, 0, 1);
    const dateReturn = sut.compareEquals(dateInitial, dateFinish);
    expect(dateReturn).toBeTruthy();
  });

  it('Should calculate correctly the number of business days between two dates.', () => {
    const startDate = new Date(2023, 9, 1);
    const endDate = new Date(2023, 9, 10);
    const holidays = [new Date(2023, 9, 5)];

    const businessDays = sut.businessDaysBetween(startDate, endDate, holidays);
    expect(businessDays).toEqual(6);
  });
});
