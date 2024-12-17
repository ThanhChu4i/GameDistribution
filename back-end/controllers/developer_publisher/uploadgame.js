const { Game } = require('../../collection/collection'); // Import Game model
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const unzipper = require('unzipper');
const axios = require('axios'); // Thêm axios 

const storagePathZip = path.resolve(__dirname, '../../public/games');

// Ensure the directories exist
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

// API key for imgbb
const IMGBB_API_KEY = 'a5bc4430caba355a9dcc9585f45b114f';

// Helper function to upload image to imgbb
async function uploadToImgbb(imageBuffer) {
    try {
        const base64Image = imageBuffer.toString('base64');
        
        const formData = new FormData();
        formData.append('image', base64Image);
        
        const response = await axios.post(
            `https://api.imgbb.com/1/upload?expiration=600&key=${IMGBB_API_KEY}`, 
            formData, 
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        
        console.log("Response IMGBB:", response);
        return response.data.data.url;
    } catch (error) {
        console.error('Error uploading to imgbb:', error);
        throw new Error('Failed to upload image to imgbb.');
    }
}


// Upload handler for image and zip file
const uploadGameforDev = async (req, res) => {
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

            // Upload image to imgbb
            const publicImagePath = await uploadToImgbb(compressedImageBuffer);

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
                    const publicGamePath = `${process.env.REACT_APP_API_URL}/games/${path.basename(gameFolder)}/${zipFile[0].originalname.replace('.zip', '')}/index.html`;
                    const id_user = req.user._id;

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
                    fs.unlinkSync(zipFilePath);
                    res.json({ message: 'File uploaded and extracted successfully!', imagePath: publicImagePath, gamePath: publicGamePath });
                })
                .on('error', (err) => {
                    fs.unlinkSync(zipFilePath);
                    res.status(500).json({ error: 'Error extracting .zip file.' });
                });
        } catch (error) {
            res.status(500).json({ error: 'Error saving to database.' });
        }
    });
};

const uploadGameforPub = async (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: 'Error while uploading file.' });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }

        const { image } = req.files;
        if (!image) {
            return res.status(400).json({ error: 'Image is required.' });
        }

        try {
            const compressedImageBuffer = await sharp(image[0].buffer)
                .resize(1024)
                .toFormat('jpeg', { quality: 80 })
                .toBuffer();

            const publicImagePath = await uploadToImgbb(compressedImageBuffer);
            const id_user = req.user._id;

            const game = new Game({
                id_user: id_user,
                game_name: req.body.name,
                no_blood: req.body.no_blood,
                ingame_purchases: req.body.ingame_purchases,
                child_friendly: req.body.child_friendly,
                game_description: req.body.description,
                instruction: req.body.instruction,
                imagePath: publicImagePath,
                gamePath: req.body.gamePath,
                language: req.body.languages,
                player: req.body.players,
                genres: req.body.genres
            });

            await game.save();
            res.json({ message: 'File uploaded and game data saved successfully!', imagePath: publicImagePath });
        } catch (error) {
            res.status(500).json({ error: 'Error saving to database.' });
        }
    });
};

module.exports = { uploadGameforDev, uploadGameforPub };
