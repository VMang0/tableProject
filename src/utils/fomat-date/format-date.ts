import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

export const formatDate = (date) => format(new Date(date), 'dd.MM.yyyy');
export const formatDateAndMonth = (date) => format(date, 'd MMMM',{ locale: ruLocale });