import dayjs from 'dayjs';

export function formatDecimalDate(date: Date | string) {
  return `${dayjs(date).format('YYYY.MM.DD')}`;
}

export function formatISO2Date(date: Date | string) {
  return `${dayjs(date).format('YY/MM/DD')}`;
}

export function formatYearMonth(date: Date | string) {
  return `${dayjs(date).format('YYYY/MM')}`;
}

export function formatAPIDate(date: Date | string) {
  return `${dayjs(date).format('YYYY-MM-DD')}`;
}

export function formatJapaneseDate(date: Date | string) {
  return `${dayjs(date).format('YYYY年MM月DD日')}`;
}
