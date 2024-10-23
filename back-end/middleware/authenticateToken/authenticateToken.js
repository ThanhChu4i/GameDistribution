const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header Authorization
    if (!token) return res.sendStatus(401); // Nếu không có token, trả về 401 (Unauthorized)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Nếu token không hợp lệ, trả về 403 (Forbidden)

        req.user = user; // Lưu thông tin người dùng vào req.user để sử dụng trong các middleware tiếp theo
        next(); // Gọi middleware tiếp theo
    });
};
module.exports = authenticateToken;