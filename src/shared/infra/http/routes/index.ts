import { Router } from 'express';
import categoriesRoutes from './categories.routes';
import specificationRoutes from './specifications.routes';
import { carsRoutes } from './cars.routes';
import { usersRoutes } from './users.routes';
import { authenticateRoutes } from './authenticate.routes';
import { rentalRoutes } from './rental.routes';
import { passwordRoutes  } from './password.routes';

const router = Router();

router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoutes);
router.use("/categories", categoriesRoutes)
router.use("/specifications", specificationRoutes);
router.use("/users", usersRoutes);
router.use("/password", passwordRoutes);
router.use(authenticateRoutes);

export default router;