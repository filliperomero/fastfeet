import Delivery from '../models/Delivery';
import File from '../models/File';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';

import DeliveryRegistrationMail from '../jobs/DeliveryRegistrationMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    // TODO: add a page system here
    const deliveries = await Delivery.findAll({
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        { model: File, as: 'signature', attributes: ['id', 'path', 'url'] },
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zipCode',
          ],
        },
      ],
    });

    if (!deliveries || deliveries.length <= 0) {
      res.status(404).json({ error: 'Deliveries not found' });
    }

    return res.json(deliveries);
  }

  async store(req, res) {
    const { deliveryman_id, recipient_id } = req.body;
    const deliveryman = await DeliveryMan.findByPk(deliveryman_id);

    if (!deliveryman) {
      res.status(404).json({ error: 'Delivery man not found' });
    }

    const recipient = await Recipient.findByPk(recipient_id);

    if (!recipient) {
      res.status(404).json({ error: 'Recipient not found' });
    }

    const delivery = await Delivery.create(req.body);

    await Queue.add(DeliveryRegistrationMail.key, {
      delivery,
      deliveryman,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const delivery = await Delivery.findOne({
      where: { id: req.params.id },
    });

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    if (delivery.canceled_at || delivery.end_date) {
      return res.status(403).json({
        error:
          'You cannot update a delivery that has already been delivered/canceled',
      });
    }

    await delivery.update(req.body);

    return res.json(delivery);
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    if (delivery.start_date) {
      return res.status(400).json({
        error: 'Delivery cannot be deleted. Someone is delivering this package',
      });
    }

    await delivery.destroy();

    return res.status(204).send();
  }
}

export default new DeliveryController();
