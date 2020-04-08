import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';

import DeliveryCancelationMail from '../jobs/DeliveryCancelationMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
  async index(req, res) {
    const problems = await DeliveryProblem.findAll({
      include: [
        {
          model: Delivery,
          as: 'delivery',
        },
      ],
    });

    if (problems.length <= 0) {
      return res
        .status(404)
        .json({ error: "Didn't find any delivery with problems" });
    }

    return res.json(problems);
  }

  async indexSpecific(req, res) {
    const { id } = req.params;

    const problems = await DeliveryProblem.findAll(
      {
        where: { delivery_id: id },
      },
      {
        include: [
          {
            model: Delivery,
            as: 'delivery',
          },
        ],
      }
    );

    if (problems.length <= 0) {
      return res
        .status(404)
        .json({ error: 'No problems found to this delivery' });
    }

    return res.json(problems);
  }

  async create(req, res) {
    const { id } = req.params;
    const { description, deliveryman_id } = req.body;

    const delivery = await Delivery.findByPk(id);

    if (Number(delivery.id) !== Number(deliveryman_id)) {
      return res.status(403).json({
        error: "You cannot create problems in deliveries that aren't yours",
      });
    }

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id: id,
      description,
    });

    return res.json(deliveryProblem);
  }

  async delete(req, res) {
    const { id } = req.params;

    const problem = await DeliveryProblem.findByPk(id);

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    const delivery = await Delivery.findByPk(problem.delivery_id, {
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['id', 'email', 'name'],
        },
      ],
    });

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    delivery.canceled_at = new Date();

    await delivery.save();

    await Queue.add(DeliveryCancelationMail.key, {
      delivery,
      problem,
    });

    return res.json(delivery);
  }
}

export default new DeliveryProblemController();
