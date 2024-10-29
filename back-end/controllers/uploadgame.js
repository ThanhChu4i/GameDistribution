const { Game } = require('../collection/collection'); // Nhập mô hình Game

// Hàm xử lý upload ảnh
const uploadGameImage = async (req, res) => {
    const { id_user, name, no_blood, child_friendly, ingame_purchases, imagePath } = req.body;

    // Chỉ lưu đường dẫn ảnh và thông tin vào database
    const game = new Game({
        id_user, 
        game_name: name,
        no_blood,
        ingame_purchases,
        child_friendly,
        imagePath,  // đường dẫn tương đối ảnh từ client
    });

    try {
        await game.save();
        res.json({ message: 'Game info saved successfully!', filePath: imagePath });
    } catch (error) {
        console.error("Database Error: ", error);
        res.status(500).json({ error: 'Lỗi khi lưu vào cơ sở dữ liệu.' });
    }
};

module.exports = {
    uploadGameImage,
};
