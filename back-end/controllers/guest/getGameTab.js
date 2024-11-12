const { Game } = require('../../collection/collection');
const path = require('path');

// Hàm lấy dữ liệu game theo tab, chia đều các game vào các tab
const getGamesByTab = async (tabNumber) => {
    const totalTabs = 5; // Giả sử có tổng cộng 5 tab
    const gamesPerPage = 8;
    const offset = (tabNumber - 1) * gamesPerPage;

    if (tabNumber < 1 || tabNumber > totalTabs) {
        throw new Error('Tab không hợp lệ.'); // Lỗi nếu tabNumber không hợp lệ
    }

    try {
        const games = await Game.find({isActive : true})
            .populate('id_user', 'id_user company')
            .skip(offset)
            .limit(gamesPerPage)
            .select('id_game game_name imagePath company'); // Thêm trường 'img' và 'company' nếu cần

        const formattedGames = games.map(game => ({
            ...game._doc, // Sao chép tất cả các trường của game
            company: game.id_user ? game.id_user.company : null, // Lấy company từ user
            imageUrl: game.imagePath ? `http://localhost:8081/api/games/image/${path.basename(game.imagePath)}` : null
        }));
    
        return formattedGames; // Trả về formattedGames thay vì games
    } catch (err) {
        console.error('Error querying the database:', err);
        throw err;
    }
};

module.exports = { getGamesByTab };
