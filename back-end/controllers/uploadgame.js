const { Game } = require('../collection/collection'); // Nhập mô hình Game
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Kiểm tra thư mục lưu trữ và tạo nếu cần thiết
const storagePath = path.resolve(__dirname, '../../front-end/public/images'); // Thay đổi đường dẫn tới thư mục public
if (!fs.existsSync(storagePath)) {
    fs.mkdirSync(storagePath, { recursive: true });
}

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

// Thiết lập multer với thư mục lưu trữ
const storage = multer.memoryStorage(); // Sử dụng memoryStorage để nén ảnh trước khi lưu
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

        // Xử lý nén ảnh với sharp
        const compressedImageBuffer = await sharp(req.file.buffer)
            .resize(1024) // Giới hạn kích thước ảnh
            .toFormat('jpeg', { quality: 80 }) // Định dạng và chất lượng
            .toBuffer();

        // Lưu file đã nén vào hệ thống
        const filename = Date.now() + path.extname(req.file.originalname);
        const filePath = path.join(storagePath, filename);

        fs.writeFile(filePath, compressedImageBuffer, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Lỗi khi lưu file.' });
            }
        });

        // Lưu đường dẫn ảnh vào game.imagePath
        const imagePath = `/images/${filename}`; // Đường dẫn công khai
        const game = new Game({
            id_user: req.body.id_user, // Thêm id_user nếu cần
            game_name: req.body.name,
            no_blood: req.body.no_blood,
            ingame_purchases: req.body.ingame_purchases,
            child_friendly: req.body.child_friendly,
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
