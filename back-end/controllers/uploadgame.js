// back-end/controllers/gameController.js
const Game = require('../collection/collection');

// Middleware multer để xử lý file upload
const multer = require('multer');
const path = require('path');

// Thiết lập multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage/'); // Thư mục lưu file
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file
    }
});

const upload = multer({ storage }).single('image');

// API upload file
const uploadGameImage = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).send('Error uploading file.');
        }

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const imagePath = `http://localhost:${process.env.PORT}/storage/${req.file.filename}`;

        const game = new Game({
            name: req.body.name,
            imagePath,
        });

        try {
            await game.save();
            res.json({ message: 'File uploaded successfully!', filePath: imagePath });
        } catch (error) {
            res.status(500).send('Error saving to database.');
        }
    });
};

module.exports = {
    uploadGameImage,
};
