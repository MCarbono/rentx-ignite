import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/CreateCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/enruseAdmin';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImage/UploadCarImagesController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const carsRoutes = Router();

const createCarController = new CreateCarController(); 
const listAvailableCarsController = new ListAvailableCarsController(); 
const createCarSpecificationController = new CreateCarSpecificationController(); 
const uploadCarImagesController = new UploadCarImagesController(); 

const uploadImages = multer(uploadConfig.upload('./tmp/cars'))

carsRoutes.get('/available', listAvailableCarsController.handle)

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRoutes.post('/specifications/:id',
    ensureAuthenticated, 
    ensureAdmin, 
    createCarSpecificationController.handle
)

carsRoutes.post('/images/:id',
    ensureAuthenticated, 
    ensureAdmin, 
    //parametro images é o mesmo nome da variavel no controller  que receberá os files no request
    uploadImages.array("images"),
    uploadCarImagesController.handle
)

export { carsRoutes }