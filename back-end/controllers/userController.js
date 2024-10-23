const { User } = require('../collection/collection'); // Import model User  

// Lấy danh sách người dùng
exports.getUsers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password'); // Không trả về mật khẩu
    console.log(req.user);
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
    // Kiểm tra nếu ID từ token khác với ID trong params thì từ chối
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Bạn không có quyền chỉnh sửa thông tin người dùng này' });
    }

    // Nếu ID trùng khớp, thực hiện cập nhật
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'Người dùng không tồn tại' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server' });
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
