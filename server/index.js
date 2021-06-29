require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import node_media_server from './media_server';


const app = express();
const port = process.env.port || 4000;


//middlewares
app.use(cors());
app.use(morgan('tiny'));


node_media_server.run();

app.listen(port, () => {
    console.log(`App listening on ${port}!`);
});
