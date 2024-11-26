const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { User } = require('../../collection/collection');

// Đảm bảo đường dẫn tới thư mục avatars trong volume shared
const storagePathAvatars = path.resolve('/app/shared/avatars'); // Đúng vị trí thư mục trong container

// Tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(storagePathAvatars)) {
    fs.mkdirSync(storagePathAvatars, { recursive: true });
}

// Kiểm tra loại tệp tải lên cho ảnh đại diện
const avatarFileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only image files (jpeg, jpg, png) are allowed!'));
    }
};

// Cấu hình multer với bộ nhớ lưu trữ và giới hạn kích thước tệp
const avatarStorage = multer.memoryStorage();
const uploadAvatar = multer({
    storage: avatarStorage,
    fileFilter: avatarFileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Giới hạn 5MB
}).single('avatar');

// Hàm xử lý tải lên avatar
const uploadUserAvatar = async (req, res) => {
    uploadAvatar(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'File upload error. Maximum size is 5MB.' });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Please upload a valid image.' });
        }

        try {
            // Nén và thay đổi kích thước ảnh
            const compressedAvatarBuffer = await sharp(req.file.buffer)
                .resize(512, 512)
                .toFormat('jpeg', { quality: 80 })
                .toBuffer();

            // Tạo tên tệp avatar
            const avatarFilename = `${req.user._id}_${Date.now()}.jpeg`;
            const avatarPath = path.join(storagePathAvatars, avatarFilename);

            // Lưu avatar đã nén vào hệ thống tệp
            fs.writeFileSync(avatarPath, compressedAvatarBuffer);

            // Định nghĩa đường dẫn công khai để client có thể truy cập
            const publicAvatarPath = `/avatars/${avatarFilename}`;

            // Cập nhật đường dẫn avatar trong bản ghi người dùng
            const user = await User.findByIdAndUpdate(
                req.user._id,
                { avatarPath: publicAvatarPath },
                { new: true }
            );

            if (!user) {
                throw new Error('User not found.');
            }

            res.status(200).json({ message: 'Avatar uploaded successfully!', avatarPath: publicAvatarPath });
        } catch (error) {
            console.error('Error updating avatar:', error);
            res.status(500).json({ error: 'An error occurred while saving the avatar.' });
        }
    });
};

module.exports = {
    uploadUserAvatar
};
