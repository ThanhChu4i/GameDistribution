// LoginValidation.js

function loginValidation(values) {
    let errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    // Kiểm tra Email
    if (!values.email) {
        errors.email = "Email should not be empty";
    } else if (!emailPattern.test(values.email)) {
        errors.email = "Email format is invalid";
    }

    // Kiểm tra Password
    if (!values.password) {
        errors.password = "Password should not be empty";
    } else if (!passwordPattern.test(values.password)) {
        errors.password = "Password must be at least 8 characters, include at least one uppercase letter, one lowercase letter, and one number";
    }

    return errors;
}

export default loginValidation;
