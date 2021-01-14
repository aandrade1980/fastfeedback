import { format, parseISO } from 'date-fns';

export const formatDate = (date, dateFormat) =>
  format(parseISO(date), dateFormat);
