const buttonSignIn = document.querySelector('[button-signIn]');
const email = document.getElementById('email');
const password = document.getElementById('password');

buttonSignIn.addEventListener("click", ()=>{
  const errorMessage = document.getElementById("error-message");
  if (!email.value) {
    errorMessage.textContent = "Vui lòng nhập email!";
    return;
  }

  // Kiểm tra mật khẩu
  if (!password.value) {
    errorMessage.textContent = "Vui lòng nhập mật khẩu!";
    return;
  }
});
// Đóng thông báo khi nhấn nút "Close"
function closeAlert() {
  const alert = document.getElementById('alert-message');
  if (alert) {
    alert.style.display = 'none';
  }
}

// Tự động đóng thông báo sau 3 giây
setTimeout(() => {
  const alert = document.getElementById('alert-message');
  if (alert) {
    alert.style.display = 'none';
  }
}, 3000);
