const jwt = require('jsonwebtoken');

const authenticateDevPub = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header Authorization
    if (!token) return res.sendStatus(401); // Nếu không có token, trả về 401 (Unauthorized)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Nếu token không hợp lệ, trả về 403 (Forbidden)
        if (!(user.isDeveloper || user.isPublisher)) {
            return res.status(403).json({ message: 'Access denied: Developer or Publisher only.' }); // Người dùng không phải admin
        }
        req.user = user; // Lưu thông tin người dùng vào req.user để sử dụng trong các middleware tiếp theo
        next(); // Gọi middleware tiếp theo
    });
};
module.exports = authenticateDevPub;