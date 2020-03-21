import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll();

    if (!recipients) {
      return res.status(404).json({ error: 'Recipients not found' });
    }

    return res.json(recipients);
  }

  async store(req, res) {
    // Are we going to check for this recipient on the db?

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
