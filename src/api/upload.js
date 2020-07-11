const express = require('express');
const { multerUploads, dataUri } = require('../utils/multer');
const { uploader } = require('../config/cloudinaryConfig');

const router = express.Router();

router.post('/', multerUploads, async (req, res) => {
    if (req.file) {
        const file = dataUri(req).content;
        try {
            const response = await uploader.upload(file, {
                folder: req.body.folder,
            });
            const image = response.secure_url;
            // console.log(response);   // DEBUGGING
            return res.status(200).json({
                success: true,
                file: {
                    url: image,
                },
            });
        } catch (error) {
            res.status(400).json({
                messge: 'Error....!!',
                data: {
                    error,
                },
            });
        }
    }
});

router.get('/', async (req, res) => {
    res.json({ message: 'Yo! Upload Route Handler here👋' });
});

module.exports = router;
