import express from "express";
import config from './config.js';
import proveedorRoutes from './routes/routes.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const ruta = __dirname;

app.set('port',config.port);
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.set('port',config.port || 3090);

app.use(proveedorRoutes);

export default app;