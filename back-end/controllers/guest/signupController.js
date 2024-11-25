const { User } = require('../../collection/collection'); // Import model User
const bcrypt = require("bcryptjs");

// Xử lý đăng ký người dùng
const signupUser = async (req, res) => {
    const { email, password, first_name, last_name, country, website, company, expected_traffic, wanttodev, wanttopub } = req.body;

    // Kiểm tra xem các trường thông tin có đầy đủ không
    if (!email || !password || !first_name || !last_name || !country || !website || !company || !expected_traffic) {
        return res.status(400).json({ message: "Please fill in all information." });
    }

    try {
        // Kiểm tra nếu email đã tồn tại
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists." });
        }

        // Mã hóa mật khẩu
        const saltRounds = 10;
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
            expected_traffic,
            wanttodev,
            wanttopub
        });

        // Lưu người dùng vào MongoDB
        await newUser.save();
        return res.status(201).json({ message: "Registration successful!" });

    } catch (err) {
        console.error('Error during registration:', err);
        return res.status(500).json({ message: "Server error." });
    }
};

module.exports = { signupUser };
