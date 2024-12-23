function validatePasswordChange() {
  console.log("ok.");
  const currentPasswordInput = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const errorElement = document.getElementById("password-error");
  
  // Lấy mật khẩu hiện tại từ server qua biến ẩn (không khuyến khích nếu lưu mật khẩu plaintext)
  const storedPassword = document.getElementById("stored-password").value;
  
  // Reset thông báo lỗi trước khi kiểm tra
  errorElement.textContent = "";

  // Kiểm tra mật khẩu hiện tại
  if (currentPasswordInput !== storedPassword) {
    errorElement.textContent = "Mật khẩu hiện tại không chính xác!";
    return false; // Ngăn form gửi đi
  }
  
  if (!newPassword) {
    return true; // Cho phép gửi form nếu các trường khác hợp lệ
  }

  // Kiểm tra mật khẩu mới và xác nhận mật khẩu
  if (newPassword !== confirmPassword) {
    errorElement.textContent = "Mật khẩu mới và xác nhận mật khẩu không khớp!";
    return false; // Ngăn form gửi đi
  }
  
  if (newPassword.length < 6) {
    errorElement.textContent = "Mật khẩu mới phải có ít nhất 6 ký tự!";
    return false; // Ngăn form gửi đi
  }

  return true; // Xác thực thành công
}