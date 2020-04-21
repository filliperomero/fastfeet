import { parseISO, format } from 'date-fns';

export const formatErrorAPI = error => {
  return error.response
    ? `${error.response.data.error} (${error.response.status})`
    : 'Something went wrong, try again';
};

export const formatDate = date => {
  return date ? format(parseISO(date), 'dd/MM/yyyy') : null;
};

export const formatStatus = data => {
  const { canceled_at, start_date, end_date } = data;

  if (canceled_at) return 'CANCELADA';

  if (end_date) return 'ENTREGUE';

  if (start_date) return 'RETIRADA';

  return 'PENDENTE';
};

export const formatNameInitials = text => {
  const textArrray = text.split(' ');
  if (textArrray.length > 1) {
    return textArrray[0].charAt(0) + textArrray[1].charAt(0);
  }

  return textArrray[0].charAt(0);
};
