import { formatDistanceToNow } from 'date-fns';

export const getFormatDistanceToNow = ( date: number) => {
  const dateNow = formatDistanceToNow(date, { addSuffix: true });

  return dateNow;
} 