const { User } = require('../collection/collection'); // Import model User
const bcrypt = require("bcrypt");

// Xử lý đăng ký người dùng
const signupUser = async (req, res) => {
    const { email, password, first_name, last_name, country, website, company, expected_traffic } = req.body;

    // Kiểm tra xem các trường thông tin có đầy đủ không
    if (!email || !password || !first_name || !last_name || !country || !website || !company || !expected_traffic) {
        return res.status(400).json({ message: "Please fill in all information." });
    }

    const saltRounds = 10;
    try {
        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Tạo một người dùng mới
        const newUser = new User({
            email,
            password: hashedPassword,
            first_name,
            last_name,
            country,
            website,
            company,
            expected_traffic
        });

        // Lưu người dùng vào MongoDB
        await newUser.save();
        return res.status(201).json({ message: "Registration successful!" });

    } catch (err) {
        console.error('Error during registration:', err);
        
        // Kiểm tra nếu lỗi là do email đã tồn tại
        if (err.code === 11000) { // Mã lỗi cho email đã tồn tại
            return res.status(409).json({ message: "Email already exists." });
        }
        return res.status(500).json({ message: "Server error." });
    }
};

module.exports = { signupUser };
