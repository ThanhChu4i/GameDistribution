const { Game } = require('../collection/collection'); // Nhập mô hình Game
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const storagePathImages = path.resolve(__dirname, '../../front-end/public/images');
const storagePathZip = path.resolve(__dirname, '../../front-end/public/games');

if (!fs.existsSync(storagePathImages)) {
    fs.mkdirSync(storagePathImages, { recursive: true });
}
if (!fs.existsSync(storagePathZip)) {
    fs.mkdirSync(storagePathZip, { recursive: true });
}

// Kiểm tra định dạng file
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|zip/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận file ảnh (jpeg, jpg, png, gif) hoặc file .zip!'));
    }
};

// Thiết lập multer
const storage = multer.memoryStorage();
const upload = multer({ storage, fileFilter }).fields([{ name: 'image' }, { name: 'zipFile' }]);

// Hàm xử lý upload ảnh và file .zip
const uploadGameImage = async (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'Lỗi khi upload file.' });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }

        const { image, zipFile } = req.files;
        if (!image || !zipFile) {
            return res.status(400).json({ error: 'Yêu cầu tải lên cả ảnh và file .zip.' });
        }

        try {
            // Xử lý nén ảnh
            const compressedImageBuffer = await sharp(image[0].buffer)
                .resize(1024)
                .toFormat('jpeg', { quality: 80 })
                .toBuffer();

            const imageFilename = Date.now() + path.extname(image[0].originalname);
            const imagePath = path.join(storagePathImages, imageFilename);

            // Lưu ảnh
            fs.writeFileSync(imagePath, compressedImageBuffer);

            // Lưu file .zip
            const zipFilename = Date.now() + path.extname(zipFile[0].originalname);
            const zipFilePath = path.join(storagePathZip, zipFilename);
            fs.writeFileSync(zipFilePath, zipFile[0].buffer);

            // Đường dẫn công khai
            const publicImagePath = `/images/${imageFilename}`;
            const publicZipPath = `/games/${zipFilename}`;

            // Lưu vào cơ sở dữ liệu
            const game = new Game({
                id_user: req.body.id_user,
                game_name: req.body.name,
                no_blood: req.body.no_blood,
                ingame_purchases: req.body.ingame_purchases,
                child_friendly: req.body.child_friendly,
<<<<<<< HEAD
=======
                game_description: req.body.descripton,
                instruction: req.body.instruction,
>>>>>>> b8848db95fa5191de8f646da59eee0cd2224d318
                imagePath: publicImagePath,
                gamePath: publicZipPath,
            });

            await game.save();
            res.json({ message: 'File uploaded successfully!', imagePath: publicImagePath, zipPath: publicZipPath });
        } catch (error) {
            console.error("Database Error: ", error);
            res.status(500).json({ error: 'Lỗi khi lưu vào cơ sở dữ liệu.' });
        }
    });
};

module.exports = {
    uploadGameImage,
};
