// controllers/adminController.js
const { Game, User } = require('../collection/collection');

// Hàm tổng hợp số liệu
const getAdminStats = async (req, res) => {
  try {
    // Tạo thời điểm 30 ngày trước
    const date30DaysAgo = new Date();
    date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);

    // Tính toán đồng thời bằng Promise.all
    const [totalGames, recentGames, totalUsers, recentUsers] = await Promise.all([
      Game.countDocuments(),
      Game.countDocuments({ date_release: { $gte: date30DaysAgo } }),
      User.countDocuments(),
      User.countDocuments({ created_in: { $gte: date30DaysAgo } })
    ]);

    // Gửi kết quả dưới dạng JSON
    res.json({
      totalGames,
      recentGames,
      totalUsers,
      recentUsers
    });
    console.log({totalGames,
        recentGames,
        totalUsers,
        recentUsers})
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = {getAdminStats};