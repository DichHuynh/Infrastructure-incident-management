document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-edit-account");
  const currentPassword = document.getElementById("current-password");
  const newPassword = document.getElementById("new-password");
  const confirmPassword = document.getElementById("confirm-password");
  const passwordError = document.getElementById("password-error");

  const validatePasswordUrl = "http://localhost:3000/api/validate-password";
  // Xử lý submit form
  form.addEventListener("submit", async (event) => {
    passwordError.textContent = "";
    passwordError.style.color = "red";

    // Kiểm tra mật khẩu hiện tại có nhập hay không
    if (!currentPassword.value.trim()) {
      event.preventDefault();
      passwordError.textContent = "Vui lòng nhập mật khẩu hiện tại.";
      currentPassword.focus();
      return;
    }

    // Kiểm tra mật khẩu mới
    if (!newPassword.value.trim()) {
      event.preventDefault();
      passwordError.textContent = "Vui lòng nhập mật khẩu mới.";
      newPassword.focus();
      return;
    }

    // Kiểm tra độ dài mật khẩu mới (ít nhất 6 ký tự)
    if (newPassword.value.trim().length < 6) {
      event.preventDefault();
      passwordError.textContent = "Mật khẩu mới phải có ít nhất 6 ký tự.";
      newPassword.focus();
      return;
    }

    // Kiểm tra xác nhận mật khẩu mới
    if (newPassword.value !== confirmPassword.value) {
      event.preventDefault();
      passwordError.textContent = "Mật khẩu xác nhận không khớp.";
      confirmPassword.focus();
      return;
    }
    // Xác thực mật khẩu cũ 
    try {
      const response = await fetch(validatePasswordUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: currentPassword.value.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.isValid) {
        event.preventDefault();
        passwordError.textContent = "Mật khẩu hiện tại không chính xác.";
        currentPassword.focus();
        return;
      }

      // Nếu mật khẩu cũ hợp lệ, cho phép gửi form
    } catch (error) {
      event.preventDefault();
      passwordError.textContent = "Đã xảy ra lỗi trong quá trình xác thực. Vui lòng thử lại.";
      console.error("Error validating password:", error);
    }
  });
});