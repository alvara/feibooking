import dayjs from 'dayjs';

export function formatShortDate(date: Date | string) {
  return `${dayjs(date).format('ddd DD MMM')}`;
}
