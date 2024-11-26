const { Game } = require('../../collection/collection'); // Import Game model
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const unzipper = require('unzipper');

const storagePathImages = path.resolve(__dirname, '../../public/images');
const storagePathZip = path.resolve(__dirname, '../../public/games');

// Ensure the directories exist
if (!fs.existsSync(storagePathImages)) {
    fs.mkdirSync(storagePathImages, { recursive: true });
}
if (!fs.existsSync(storagePathZip)) {
    fs.mkdirSync(storagePathZip, { recursive: true });
}

// File filter for image and zip files
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|zip/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only image files (jpeg, jpg, png, gif) or .zip files are allowed!'));
    }
};

// Multer setup with memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage, fileFilter }).fields([{ name: 'image' }, { name: 'zipFile' }]);

// Upload handler for image and zip file
const uploadGameImage = async (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.error('Multer Error:', err);
            return res.status(400).json({ error: 'Error while uploading file.' });
        } else if (err) {
            console.error('Upload Error:', err);
            return res.status(400).json({ error: err.message });
        }

        const { image, zipFile } = req.files;
        if (!image || !zipFile) {
            return res.status(400).json({ error: 'Both image and .zip file are required.' });
        }

        try {
            // Compress the image using Sharp
            const compressedImageBuffer = await sharp(image[0].buffer)
                .resize(1024)
                .toFormat('jpeg', { quality: 80 })
                .toBuffer();

            const imageFilename = Date.now() + path.extname(image[0].originalname);
            const imagePath = path.join(storagePathImages, imageFilename);

            // Save the compressed image
            fs.writeFileSync(imagePath, compressedImageBuffer);
            console.log(`Image saved to: ${imagePath}`);

            // Save the zip file
            const zipFilename = Date.now() + path.extname(zipFile[0].originalname);
            const zipFilePath = path.join(storagePathZip, zipFilename);
            fs.writeFileSync(zipFilePath, zipFile[0].buffer);
            console.log(`Zip file saved to: ${zipFilePath}`);

            // Unzip the .zip file
            const gameFolder = path.join(storagePathZip, path.basename(zipFilePath, '.zip'));
            fs.mkdirSync(gameFolder, { recursive: true });
            fs.createReadStream(zipFilePath)
                .pipe(unzipper.Extract({ path: gameFolder }))
                .on('close', async () => {
                    console.log('next');
                    // Public path URLs for image and game
                    const publicImagePath = `http://45.77.32.24:8081/images/${imageFilename}`;
                    const publicGamePath = `http://45.77.32.24:8081/games/${path.basename(gameFolder)}/${zipFile[0].originalname.replace('.zip', '')}/index.html`;
                    const id_user = req.user._id;
                    console.log(`User ID: ${id_user}`);

                    // Save game data into the database
                    const game = new Game({
                        id_user: id_user,
                        game_name: req.body.name,
                        no_blood: req.body.no_blood,
                        ingame_purchases: req.body.ingame_purchases,
                        child_friendly: req.body.child_friendly,
                        game_description: req.body.description,
                        instruction: req.body.instruction,
                        imagePath: publicImagePath,
                        gamePath: publicGamePath,
                        language: req.body.languages,
                        player: req.body.players,
                        genres: req.body.genres
                    });

                    await game.save();
                    console.log('Game data saved to the database.');

                    // Clean up: delete the zip file after extraction
                    fs.unlinkSync(zipFilePath);
                    res.json({
                        message: 'File uploaded and extracted successfully!',
                        imagePath: publicImagePath,
                        gamePath: publicGamePath
                    });
                })
                .on('error', (err) => {
                    console.error('Unzip Error:', err);
                    fs.unlinkSync(zipFilePath); // Clean up the zip file in case of error
                    res.status(500).json({ error: 'Error extracting .zip file.' });
                });
        } catch (error) {
            console.error('Database Error:', error);
            res.status(500).json({ error: 'Error saving to database.' });
        }
    });
};

module.exports = {
    uploadGameImage,
};
