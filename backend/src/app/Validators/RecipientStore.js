import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string()
        .trim()
        .required(),
      street: Yup.string()
        .trim()
        .required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string()
        .trim()
        .required(),
      city: Yup.string()
        .trim()
        .required(),
      zipCode: Yup.string()
        .trim()
        .required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails', messages: err.inner });
  }
};
