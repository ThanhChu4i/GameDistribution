const { Game, User } = require('../collection/collection'); // Import các model từ collection.js

// Hàm lấy dữ liệu game theo tab
const getGamesByTab = async (tabNumber, callback) => {
    const gamesPerPage = 8; // Số lượng game mỗi tab
    const offset = (tabNumber - 1) * gamesPerPage; // Tính offset cho mỗi tab

    try {
        // Thực hiện truy vấn để lấy game và thông tin người dùng
        const games = await Game.find()
            .populate('id_user', 'id_user company') // Join với User để lấy thông tin id_user và company
            .skip(offset) // Bỏ qua các kết quả dựa trên offset
            .limit(gamesPerPage) // Giới hạn số lượng game mỗi tab
            .select('id_game game_name no_blood child_friendly img ingame_purchases'); // Chọn các trường cần thiết

        // Trả về kết quả thông qua callback
        callback(null, games);
    } catch (err) {
        console.error('Error querying the database:', err);
        callback(err, null);
    }
};

module.exports = { getGamesByTab };
