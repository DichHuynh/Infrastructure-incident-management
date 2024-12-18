document.addEventListener('DOMContentLoaded', () => {
  const sidebarLinks = document.querySelectorAll('.sidebar a'); // Lấy tất cả thẻ a trong sidebar
  const currentPath = window.location.pathname; // Đường dẫn hiện tại của trang

  // Lặp qua tất cả các thẻ a
  sidebarLinks.forEach(link => {
    // So sánh href của từng link với đường dẫn hiện tại
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active'); // Thêm lớp active vào link tương ứng
    } else {
      link.classList.remove('active'); // Xóa lớp active khỏi các link khác
    }
  });
});
