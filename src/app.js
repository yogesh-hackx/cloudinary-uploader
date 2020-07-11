const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { cloudinaryConfig } = require('./config/cloudinaryConfig');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev :req[Origin]'));
app.use(helmet());

const CORS_WHITELIST = process.env.CORS_WHITELIST.split(' ');

const corsOptions = {
    origin: (origin, callback) => {
        if (CORS_WHITELIST.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));
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
