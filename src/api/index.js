const express = require('express');

const upload = require('./upload');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Cloudinary Uploader',
        endpoints: '/upload',
    });
});

router.use('/upload', upload);

module.exports = router;
