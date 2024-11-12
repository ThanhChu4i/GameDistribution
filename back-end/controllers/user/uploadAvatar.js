const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { User } = require('../../collection/collection'); // Mô hình User

const storagePathAvatars = path.resolve(__dirname, '../../../front-end/public/avatars');

// Tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(storagePathAvatars)) {
    fs.mkdirSync(storagePathAvatars, { recursive: true });
}

// Kiểm tra định dạng file
const avatarFileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận file ảnh (jpeg, jpg, png)!'));
    }
};

// Thiết lập multer
const avatarStorage = multer.memoryStorage();
const uploadAvatar = multer({ storage: avatarStorage, fileFilter: avatarFileFilter }).single('avatar');

// Hàm xử lý upload avatar
const uploadUserAvatar = async (req, res) => {
    uploadAvatar(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'Lỗi khi upload file.' });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }

        const { avatar } = req.file;
        if (!avatar) {
            return res.status(400).json({ error: 'Yêu cầu tải lên ảnh đại diện.' });
        }

        try {
            // Xử lý nén ảnh
            const compressedAvatarBuffer = await sharp(req.file.buffer)
                .resize(512, 512) // Kích thước ảnh avatar
                .toFormat('jpeg', { quality: 80 })
                .toBuffer();

            const avatarFilename = `${req.user._id}_${Date.now()}${path.extname(req.file.originalname)}`;
            const avatarPath = path.join(storagePathAvatars, avatarFilename);

            // Lưu avatar vào thư mục
            fs.writeFileSync(avatarPath, compressedAvatarBuffer);

            // Đường dẫn công khai
            const publicAvatarPath = `/avatars/${avatarFilename}`;

            // Cập nhật vào cơ sở dữ liệu (User collection)
            await User.findByIdAndUpdate(req.user._id, { avatarPath: publicAvatarPath });

            res.json({ message: 'Avatar uploaded successfully!', avatarPath: publicAvatarPath });
        } catch (error) {
            console.error("Database Error: ", error);
            res.status(500).json({ error: 'Lỗi khi lưu vào cơ sở dữ liệu.' });
        }
    });
};

module.exports = {
    uploadUserAvatar
};
