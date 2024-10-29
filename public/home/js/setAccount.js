function validatePasswordChange() {
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const errorElement = document.getElementById("password-error");
  
  // Reset thông báo lỗi trước khi kiểm tra
  errorElement.textContent = "";

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
