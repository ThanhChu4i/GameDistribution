// signupValidation.js

function signupValidation(values) {
    let errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Mẫu email
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // Mẫu mật khẩu

    // Kiểm tra first_name
    if (!values.first_name.trim()) {
        errors.first_name = "Tên không được để trống"; // Thông báo lỗi
    }

    // Kiểm tra last_name
    if (!values.last_name.trim()) {
        errors.last_name = "Họ không được để trống"; // Thông báo lỗi
    }

    // Kiểm tra email
    if (!values.email.trim()) {
        errors.email = "Email không được để trống"; // Thông báo lỗi
    } else if (!emailPattern.test(values.email)) {
        errors.email = "Email không hợp lệ"; // Thông báo lỗi
    }

    // Kiểm tra password
    if (!values.password) {
        errors.password = "Mật khẩu không được để trống"; // Thông báo lỗi
    } else if (!passwordPattern.test(values.password)) {
        errors.password = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất một chữ cái viết hoa, một chữ cái viết thường và một số"; // Thông báo lỗi
    }

    // Kiểm tra country
    if (!values.country) {
        errors.country = "Vui lòng chọn quốc gia"; // Thông báo lỗi
    }

    // Kiểm tra website
    if (!values.website.trim()) {
        errors.website = "Website không được để trống"; // Thông báo lỗi
    } else {
        // Kiểm tra định dạng URL
        try {
            new URL(values.website);
        } catch (_) {
            errors.website = "URL website không hợp lệ";
        }
    }
        // Kiểm tra email
        if (!values.company.trim()) {
            errors.company = "Công ty không được để trống"; // Thông báo lỗi
        }
    // Kiểm tra expected_traffic
    if (!values.expected_traffic) {
        errors.expected_traffic = "Vui lòng chọn dự kiến lưu lượng truy cập"; // Thông báo lỗi
    }

    // Kiểm tra checkbox accept_terms
    if (!values.accept_terms) {
        errors.accept_terms = "Bạn phải chấp nhận các điều khoản và điều kiện";
    }

    // Kiểm tra checkbox accept_privacy
    if (!values.accept_privacy) {
        errors.accept_privacy = "Bạn phải chấp nhận chính sách bảo mật";
    }

    return errors; // Trả về đối tượng lỗi
}

export default signupValidation;
