const { Game } = require('../collection/collection'); // Nhập mô hình Game
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Kiểm tra thư mục lưu trữ và tạo nếu cần thiết
const storagePath = path.resolve(__dirname, '../../storage'); // Dùng path.resolve để tránh lỗi đường dẫn
if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, { recursive: true });
}

// Thiết lập multer với thư mục lưu trữ
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storagePath);
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
        cb(new Error('Chỉ chấp nhận file ảnh có định dạng jpeg, jpg, png, hoặc gif!'));
    }
};

const upload = multer({ storage, fileFilter }).single('image');

// Hàm xử lý upload ảnh
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

        // Lưu đường dẫn ảnh vào game.imagePath
        const imagePath = `/storage/${req.file.filename}`; // Đường dẫn công khai
        const game = new Game({
            id_user: req.body.id_user, // Thêm id_user nếu cần
            game_name: req.body.name,
            imagePath,
        });

        try {
            await game.save();
            res.json({ message: 'File uploaded successfully!', filePath: imagePath });
        } catch (error) {
            console.error("Database Error: ", error);
            res.status(500).json({ error: 'Lỗi khi lưu vào cơ sở dữ liệu.' });
        }
    });
};

module.exports = {
    uploadGameImage,
};
