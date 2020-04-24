import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';
import DeliveryMan from '../models/DeliveryMan';
import Delivery from '../models/Delivery';
import File from '../models/File';

class DeliveryManController {
  async indexSpecific(req, res) {
    const { id } = req.params;

    const deliveryman = await DeliveryMan.findByPk(id, {
      attributes: ['id', 'name', 'email'],
      include: [
        { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
      ],
    });

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    return res.json(deliveryman);
  }

  async index(req, res) {
    const { q: deliverymanName, page = 1 } = req.query;

    const deliveryMen = deliverymanName
      ? await DeliveryMan.findAll({
          where: {
            name: {
              [Op.iLike]: `%${deliverymanName}%`,
            },
          },
          attributes: ['id', 'name', 'email'],
          include: [
            { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
          ],
          offset: (page - 1) * 5,
          limit: 5,
        })
      : await DeliveryMan.findAll({
          attributes: ['id', 'name', 'email'],
          include: [
            { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
          ],
          offset: (page - 1) * 5,
          limit: 5,
        });

    if (!deliveryMen || deliveryMen.length <= 0) {
      return res.status(404).json({ error: 'Delivery men not found' });
    }

    return res.json(deliveryMen);
  }

  async store(req, res) {
    const deliveryManExists = await DeliveryMan.findOne({
      where: { email: req.body.email },
    });

    if (deliveryManExists) {
      return res.status(400).json({ error: 'Delivery man already exist' });
    }

    const { id, name, email } = await DeliveryMan.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const deliveryMan = await DeliveryMan.findOne({
      where: { id: req.params.id },
    });

    if (!deliveryMan) {
      return res.status(404).json({ error: 'Delivery man not found' });
    }

    await deliveryMan.update(req.body);

    const { id, name, email, avatar } = await DeliveryMan.findByPk(
      req.params.id,
      {
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],
      }
    );

    return res.json({ id, name, email, avatar });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryman = await DeliveryMan.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    const delivery = await Delivery.findOne({
      where: { deliveryman_id: id, end_date: null },
    });

    if (delivery) {
      return res.status(403).json({
        error: 'Cannot delete this deliveryman, he is delivering a package',
      });
    }

    if (deliveryman.avatar !== null) {
      fs.unlink(
        `${path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads')}/${
          deliveryman.avatar.path
        }`,
        err => {
          if (err) console.log(err);
        }
      );
    }

    deliveryman.destroy();

    return res.status(204).send();
  }
}

export default new DeliveryManController();
