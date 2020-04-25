import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async indexSpecific(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    return res.json(recipient);
  }

  async index(req, res) {
    const { q: recipientName, page = 1 } = req.query;

    const recipients = recipientName
      ? await Recipient.findAll({
          where: {
            name: {
              [Op.iLike]: `%${recipientName}%`,
            },
          },
          offset: (page - 1) * 5,
          limit: 5,
        })
      : await Recipient.findAll({ offset: (page - 1) * 5, limit: 5 });

    if (!recipients) {
      return res.status(404).json({ error: 'Recipients not found' });
    }

    return res.json(recipients);
  }

  async store(req, res) {
    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exist' });
    }

    const recipient = await Recipient.create(req.body);

    return res.status(201).json(recipient);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, street, number, complement, state, city, zipCode } = req.body;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    recipient.name = name;
    recipient.street = street;
    recipient.number = number;
    recipient.complement = complement;
    recipient.state = state;
    recipient.city = city;
    recipient.zipCode = zipCode;

    await recipient.save();

    return res.json(recipient);
  }
}

export default new RecipientController();
