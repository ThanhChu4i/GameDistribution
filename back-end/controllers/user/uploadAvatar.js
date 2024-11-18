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
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
}).single('avatar');

// Avatar upload handler function
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
            // Compress and resize avatar
            const compressedAvatarBuffer = await sharp(req.file.buffer)
                .resize(512, 512)
                .toFormat('jpeg', { quality: 80 })
                .toBuffer();

            // Generate avatar filename
            const avatarFilename = `${req.user._id}_${Date.now()}.jpeg`;
            const avatarPath = path.join(storagePathAvatars, avatarFilename);

            // Save compressed avatar to file system
            fs.writeFileSync(avatarPath, compressedAvatarBuffer);

            // Define public path for frontend access
            const publicAvatarPath = `/avatars/${avatarFilename}`;

            // Update user record with new avatar path
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
