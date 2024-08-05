import { format, formatDistanceToNow, parseISO } from 'date-fns';

export const formatDateTime = (date) => {
  return format(parseISO(date), 'dd.MM.yyyy | HH:mm');
};

export const timeAgo = (date) => {
  return formatDistanceToNow(parseISO(date), { addSuffix: true });
};
