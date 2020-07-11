const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { cloudinaryConfig } = require('./config/cloudinaryConfig');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(
    cors({
        origin: process.env.CORS_WHITELIST.split(' '),
    }),
);
app.use(express.json());
app.use('*', cloudinaryConfig);

app.get('/', (req, res) => {
    res.json({
        message: 'Upload in memory files to cloudinary!',
        endpoints: '/api/v1/upload',
    });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
