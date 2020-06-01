// External modules
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from 'mongoose';

// Middleware
import errorMiddleware from './api/middleware/Error.middleware';

// Controllers
import PropertyController from "./api/controllers/Property.controller";

dotenv.config();

// Variables
if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

// Log all requests made to the console
function loggerMiddleware(request: express.Request, response: express.Response, next: () => void) {
  console.log(`[LOSS CONTROL]: ${request.method} ${request.path}`);
  next();
} 

// Connect to Mongo database
mongoose.connect('mongodb://localhost/losscontrol-api', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true })

// App Configuration
app.use(helmet());
app.use(loggerMiddleware);
app.use(cors());
app.use(express.json());
app.use('/v1/api', new PropertyController().router);
app.use(errorMiddleware);

// Activate server
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// Webpack HMR Activation
type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void,
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}