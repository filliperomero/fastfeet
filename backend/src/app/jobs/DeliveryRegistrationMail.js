import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class DeliveryRegistrationMail {
  // Unique Key
  get key() {
    return 'DeliveryRegistrationMail';
  }

  async handle({ data }) {
    const { delivery, deliveryman } = data;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Encomenda Cadastrada',
      template: 'deliveryRegistration',
      context: {
        product: delivery.product,
        deliveryman: deliveryman.name,
        date: format(
          parseISO(delivery.createdAt),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new DeliveryRegistrationMail();
