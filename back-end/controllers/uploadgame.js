const Game = require('../collection/collection');
const multer = require('multer');
const path = require('path');

// Thiết lập multer với thư mục lưu trữ từ biến môi trường
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.STORAGE_PATH || '../../storage');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Kiểm tra định dạng file
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    
    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận file ảnh!'));
    }
};

const upload = multer({ storage, fileFilter }).single('image');

const uploadGameImage = async (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'Lỗi khi upload file.' });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Không có file nào được upload.' });
        }

        const imagePath = path.join(__dirname, '../../storage/', req.file.filename);
        const game = new Game({
            name: req.body.name,
            imagePath,
        });

        try {
            await game.save();
            res.json({ message: 'File uploaded successfully!', filePath: imagePath });
        } catch (error) {
            res.status(500).json({ error: 'Lỗi khi lưu vào cơ sở dữ liệu.' });
        }
    });
};

module.exports = {
    uploadGameImage,
};
