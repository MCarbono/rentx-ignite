import 'reflect-metadata'
import express, { NextFunction, Response, Request } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import "@shared/container";

import routes from './routes';
import swaggerFile from '../../../swagger.json';
import { AppError } from '@shared/errors/AppError';
import createConnection from '@shared/infra/typeorm';

createConnection();
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(express.json())
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message: err.message,
        })
    }

    return response.status(500).json({
        status: 'error',
        message: `Internal server error - ${err.message}`
    })
})

export { app }
