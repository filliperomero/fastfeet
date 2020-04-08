import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class DeliveryCancelationMail {
  // Unique Key
  get key() {
    return 'DeliveryCancelationMail';
  }

  async handle({ data }) {
    const { delivery, problem } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Encomenda Cancelada',
      template: 'deliveryCancelation',
      context: {
        product: delivery.product,
        deliveryman: delivery.deliveryman.name,
        problem: problem.description,
        date: format(
          parseISO(delivery.canceled_at),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new DeliveryCancelationMail();
