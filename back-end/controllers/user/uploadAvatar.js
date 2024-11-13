const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { User } = require('../../collection/collection');

const storagePathAvatars = path.resolve(__dirname, '../../../front-end/public/avatars');

// Create directory if it doesn't exist
if (!fs.existsSync(storagePathAvatars)) {
    fs.mkdirSync(storagePathAvatars, { recursive: true });
}

// File type validation for avatar uploads
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

// Configure multer with file size limit and memory storage
const avatarStorage = multer.memoryStorage();
const uploadAvatar = multer({
  storage: avatarStorage,
  fileFilter: avatarFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }  // 5MB limit
}).single('avatar');

// Avatar upload handler function
const uploadUserAvatar = async (req, res) => {
    uploadAvatar(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'Error uploading file.' });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Please upload an avatar.' });
        }

        try {
            // Compress and resize avatar
            const compressedAvatarBuffer = await sharp(req.file.buffer)
                .resize(512, 512)
                .toFormat('jpeg', { quality: 80 })
                .toBuffer();

            // Set avatar filename and path
            const avatarFilename = `${req.user._id}_${Date.now()}${path.extname(req.file.originalname)}`;
            const avatarPath = path.join(storagePathAvatars, avatarFilename);

            // Save compressed avatar to file system
            fs.writeFileSync(avatarPath, compressedAvatarBuffer);

            // Define public path for frontend access
            const publicAvatarPath = `/avatars/${avatarFilename}`;

            // Update user record with new avatar path
            await User.findByIdAndUpdate(req.user._id, { avatarPath: publicAvatarPath });

            console.log("Avatar uploaded and database updated successfully.");
            res.status(200).json({ message: 'Avatar uploaded successfully!', avatarPath: publicAvatarPath });
        } catch (error) {
            console.error("Database Error: ", error);
            res.status(500).json({ error: 'Error saving to database.' });
        }
    });
};

module.exports = {
    uploadUserAvatar
};
