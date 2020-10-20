import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import OrphanagesController from './controllers/OrphanagesController';
import {
  validateCreateData,
  validateUpdateData,
} from './middlewares/OrphanageMiddleware';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesController.index);
routes.get(
  '/orphanages/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  OrphanagesController.show
);
routes.post(
  '/orphanages',
  upload.array('images'),
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        about: Joi.string().required(),
        instructions: Joi.string().required(),
        opening_hours: Joi.string().required(),
        open_on_weekends: Joi.boolean().required(),
        images: Joi.array().optional(),
      },
    },
    { abortEarly: false }
  ),
  validateCreateData,
  OrphanagesController.create
);
routes.put(
  '/orphanages/:id',
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        about: Joi.string().required(),
        instructions: Joi.string().required(),
        opening_hours: Joi.string().required(),
        open_on_weekends: Joi.boolean().required(),
      },
    },
    { abortEarly: false }
  ),
  validateUpdateData,
  OrphanagesController.update
);

export default routes;
