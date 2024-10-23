// controllers/getGameById.js
const db = require('./connectdb.js');

const getGameById = (req, res) => {
    const id_game = req.params.id; // Lấy id_game từ params (đường dẫn)
    console.log(`Fetching game with ID: ${id_game}`);

    // Câu truy vấn SQL với placeholders để truyền tham số an toàn
    const sqlQuery = `
        SELECT 
            game.id_game,
            game.game_name,
            game.no_blood,
            game.child_friend AS child_friendly,
            game.ingame_purchases AS ingame_purchases, -- Sửa tên cột
            game.file_path,
            user.id_user,
            user.company
        FROM game 
        INNER JOIN user ON game.id_user = user.id_user
        WHERE game.id_game = ?
    `;

    console.log('Executing SQL Query:', sqlQuery);
    console.log('With Parameters:', [id_game]);

    // Thực hiện truy vấn với id_game
    db.query(sqlQuery, [id_game], (err, results) => {
        if (err) {
            console.error('Error fetching game by ID:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            console.log('Game found:', results[0]);
            res.json(results[0]); // Trả về thông tin trò chơi dưới dạng JSON
        } else {
            console.log('Game not found');
            res.status(404).json({ message: 'Game not found' });
        }
    });
};

module.exports = { getGameById };
