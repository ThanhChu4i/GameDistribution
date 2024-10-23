const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401); // Không có token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Token không hợp lệ

        if (!user.isAdmin) {
            return res.status(403).json({ message: 'Access denied: Admins only.' }); // Người dùng không phải admin
        }

        req.user = user; // Lưu thông tin người dùng vào req.user
        next(); // Tiếp tục với middleware tiếp theo
    });
};
module.exports = authenticateAdmin;