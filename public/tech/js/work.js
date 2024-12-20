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


// //Load nhiệm vụ
// document.addEventListener('DOMContentLoaded', () => {
//   const technicianId = getTechnicianIdFromUrl(); // Hàm lấy technicianId từ URL
//   const taskList = document.querySelector('#task-list');

//   // Hàm lấy danh sách nhiệm vụ từ API
//   const fetchTasks = async () => {
//     try {
//       const response = await fetch(`/tech/home/${technicianId}/work/assignedTasks`);
//       if (!response.ok) throw new Error('Error fetching tasks');

//       const tasks = await response.json();
//       renderTasks(tasks); // Hiển thị nhiệm vụ trên giao diện
//     } catch (error) {
//       taskList.innerHTML = '<p>Không thể tải danh sách nhiệm vụ.</p>';
//       console.error(error);
//     }
//   };

//   // Hàm hiển thị danh sách nhiệm vụ
//   const renderTasks = (tasks) => {
//     if (tasks.length === 0) {
//       taskList.innerHTML = '<p>Không có nhiệm vụ nào được giao.</p>';
//       return;
//     }

//     const taskHtml = tasks.map(task => `
//       <div class="task">
//         <h3>${task.Infrastructure.name} (${task.status})</h3>
//         <p><strong>Mô tả:</strong> ${task.description}</p>
//         <p><strong>Vị trí:</strong> ${task.location || task.Infrastructure.location}</p>
//         <p><strong>Ngày báo cáo:</strong> ${task.report_date}</p>
//         <p><strong>Ghi chú:</strong> ${task.notes || 'Không có'}</p>
//       </div>
//     `).join('');

//     taskList.innerHTML = taskHtml;
//   };

//   fetchTasks(); // Gọi API khi trang load
// });

