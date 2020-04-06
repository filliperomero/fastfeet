import { Op } from 'sequelize';
import { startOfDay, endOfDay, getHours } from 'date-fns';

import Delivery from '../models/Delivery';
import File from '../models/File';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';

class DeliveryManagementController {
  async showDeliveredPackages(req, res) {
    const { id } = req.params;

    const deliveryman = await DeliveryMan.findByPk(id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Delivery man not found' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        signature_id: { [Op.not]: null },
        end_date: { [Op.not]: null },
      },
      order: ['createdAt'],
      include: [
        { model: File, as: 'signature', attributes: ['id', 'path', 'url'] },
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

    if (deliveries.length <= 0) {
      return res
        .status(404)
        .json({ error: "You don't have any packages delivered." });
    }

    return res.json(deliveries);
  }

  async index(req, res) {
    const { id } = req.params;

    const deliveryman = await DeliveryMan.findByPk(id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Delivery man not found' });
    }

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        end_date: { [Op.is]: null },
        canceled_at: { [Op.is]: null },
      },
      attributes: ['id', 'product', 'start_date', 'canceled_at', 'end_date'],
      order: ['createdAt'],
      include: [
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

    if (deliveries.length <= 0) {
      return res
        .status(404)
        .json({ error: "You don't have any packages to delivery." });
    }

    return res.json(deliveries);
  }

  async update(req, res) {
    const { status, signature_id } = req.body;
    const { deliverymanId, deliveryId } = req.params;

    if (status === 'start' && signature_id) {
      return res.status(400).json({
        error:
          'Signature should just be provided when the packaged is deliveried',
      });
    }

    if (status === 'finish' && !signature_id) {
      return res.status(400).json({ error: 'Signature must be provided' });
    }

    const deliveryman = await DeliveryMan.findByPk(deliverymanId);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Delivery man not found' });
    }

    const delivery = await Delivery.findByPk(deliveryId);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    if (Number(deliverymanId) !== Number(delivery.deliveryman_id)) {
      return res.status(403).json({
        error: 'You cannot access deliveries from another delivery man',
      });
    }

    const date = new Date();

    if (status === 'start') {
      if (delivery.start_date !== null) {
        return res.status(403).json({ error: 'Package already picked up' });
      }

      if (getHours(date) < 8 || getHours(date) > 18) {
        return res
          .status(403)
          .json({ error: 'Packages can only be picked up from 8 am to 8 pm' });
      }

      const deliveries = await Delivery.findAll({
        where: {
          deliveryman_id: deliverymanId,
          start_date: { [Op.between]: [startOfDay(date), endOfDay(date)] },
        },
      });

      if (deliveries.length >= 5) {
        return res
          .status(400)
          .json({ error: 'You can only take 5 packages a day' });
      }

      delivery.start_date = date;
    } else if (status === 'finish') {
      if (delivery.end_date !== null) {
        return res.status(403).json({ error: 'Package already delivered' });
      }

      delivery.end_date = date;
      delivery.signature_id = signature_id;
    } else {
      return res
        .status(500)
        .json({ error: 'Status provided not recognized by our server' });
    }

    await delivery.save();

    return res.json(delivery);
  }
}

export default new DeliveryManagementController();
