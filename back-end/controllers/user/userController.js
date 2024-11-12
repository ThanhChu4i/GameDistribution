const { User } = require('../../collection/collection'); // Import model User  
const bcrypt = require('bcrypt'); // Thư viện mã hóa mật khẩu
// Lấy danh sách người dùng
exports.getUsers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password'); // Không trả về mật khẩu
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Trả về thông tin người dùng hiện tại
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
}
};

// Chỉnh sửa thông tin người dùng
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { ...req.body, update_in: Date.now() }, // Cập nhật trường update_in
      { new: true, runValidators: true } // Trả về đối tượng đã cập nhật và kiểm tra giá trị
    ).select('-password'); // Không trả về mật khẩu

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Xóa người dùng
exports.deleteUser = async (req, res) => {
  try {
    // Kiểm tra nếu ID từ token khác với ID trong params thì từ chối
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Bạn không có quyền xóa người dùng này' });
    }

    // Nếu ID trùng khớp, thực hiện xóa
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Người dùng không tồn tại' });

    await user.remove();
    res.json({ message: 'Người dùng đã bị xóa' });
  } catch (err) { 
    res.status(500).json({ message: 'Lỗi server' });
  }
};
// UserController.js

// Hàm đổi mật khẩu
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    // Tìm người dùng theo ID từ token
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // So sánh mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    // Mã hóa mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Lưu người dùng với mật khẩu mới
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};