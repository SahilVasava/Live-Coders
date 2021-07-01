require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { sequelize } from './db';

import node_media_server from './media_server';
import authRoute from './routes/auth';


const app = express();
const port = process.env.port || 4000;

// Sync db
sequelize.sync({ alter: true }).then(() => {
    console.log("All models were synchronized successfully.");
});



//middlewares
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(cors());
app.use(morgan('tiny'));


node_media_server.run();

// routes
app.use('/auth', authRoute);

app.listen(port, () => {
    console.log(`App listening on ${port}!`);
});
