// Lấy tất cả các liên kết trong thanh điều hướng
const navLinks = document.querySelectorAll('.nav-link');
const contents = document.querySelectorAll('.content');

// Thêm sự kiện click cho từng liên kết
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Xóa class active khỏi tất cả liên kết
        navLinks.forEach(link => link.classList.remove('active'));

        // Xóa class active khỏi tất cả nội dung
        contents.forEach(content => content.classList.remove('active'));

        // Thêm class active cho liên kết được click
        link.classList.add('active');

        // Hiển thị nội dung tương ứng
        const pageId = link.dataset.page;
        document.getElementById(pageId).classList.add('active');
    });
});
