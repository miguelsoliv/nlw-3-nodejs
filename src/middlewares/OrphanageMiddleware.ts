import { RequestHandler } from 'express';

import { validateCreate, validateUpdate } from '../validators/OrphanageSchema';

export const validateCreateData: RequestHandler = async (request, _, next) => {
  const requestImages = request.files as Express.Multer.File[];
  const images = requestImages.map(image => {
    return { path: image.filename };
  });

  await validateCreate({
    ...request.body,
    images,
  });

  next();
};

export const validateUpdateData: RequestHandler = async (request, _, next) => {
  await validateUpdate(request.body);

  next();
};
