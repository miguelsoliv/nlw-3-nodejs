import * as Yup from 'yup';

interface IValidateBase {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
}

interface IValidateCreate extends IValidateBase {
  images: Array<{
    path: string;
  }>;
}

const baseSchema = Yup.object().shape({
  name: Yup.string().required(),
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
  about: Yup.string().max(300).required(),
  instructions: Yup.string().required(),
  opening_hours: Yup.string().required(),
  open_on_weekends: Yup.boolean().required(),
});

export const validateCreate = async (data: IValidateCreate): Promise<void> => {
  const createSchema = { ...baseSchema };

  Object.assign(createSchema, {
    images: Yup.array(
      Yup.object().shape({
        path: Yup.string().required(),
      })
    ),
  });

  await createSchema.validate(data, {
    abortEarly: false,
  });
};

export const validateUpdate = async (data: IValidateBase): Promise<void> => {
  await baseSchema.validate(data, {
    abortEarly: false,
  });
};
