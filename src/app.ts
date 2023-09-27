import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import {
    IocAdapter,
    useContainer,
    useExpressServer,
} from 'routing-controllers';
import { logger, stream } from '@utils/logger';
import errorMiddleware from '@middlewares/middleware';
import { PORT, NODE_ENV, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config/index';

class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor(Controllers: Function[], Container: IocAdapter) {
        this.app = express();
        this.env = NODE_ENV || 'development';
        this.port = PORT || 3000;

        this.initializeMiddlewares();
        this.initializeRoutes(Controllers, Container);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`=================================`);
            logger.info(`======= ENV: ${this.env} =======`);
            logger.info(`🚀 App listening on the port ${this.port}`);
            logger.info(`=================================`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeMiddlewares() {
        this.app.use(morgan(LOG_FORMAT, { stream }));
        this.app.use(hpp());
        this.app.use(helmet({ hsts: false }));
        this.app.use(compression());
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(
            express.urlencoded({
                extended: true,
                limit: '50mb',
                parameterLimit: 50000,
            }),
        );
        this.app.use(cookieParser());
    }

    private initializeRoutes(controllers: Function[], Container: IocAdapter) {
        useContainer(Container);
        useExpressServer(this.app, {
            cors: {
                origin: ORIGIN,
                credentials: CREDENTIALS,
            },
            controllers: controllers,
            defaultErrorHandler: false,
            routePrefix: 'api',
        });
    }
}

export default App;
