// document.addEventListener('DOMContentLoaded', () => {
//   const modal = document.getElementById('issueDetailModal');
//   const issueIdField = document.getElementById('modalIssueId');
//   const locationField = document.getElementById('modalLocation');
//   const descriptionField = document.getElementById('modalDescription');
//   const reportDateField = document.getElementById('modalReportDate');
//   const statusField = document.getElementById('modalStatus');
//   const imageField = document.getElementById('modalImage');
//   const tech = document.getElementById('modalTech');

//   document.querySelectorAll('.view-detail').forEach(button => {
//     button.addEventListener('click', async () => {
//       const issueId = button.getAttribute('data-issue-id'); // ID của sự cố
//       const userId = button.getAttribute('data-user-id');

//       if (!issueId) {
//         alert("Dữ liệu không hợp lệ. Vui lòng thử lại!");
//         return;
//       }

//       try {
//         const response = await fetch(`/user/home/${userId}/issues/${issueId}`); // Đảm bảo URL chính xác
//         if (!response.ok) {
//           throw new Error("Không thể lấy dữ liệu chi tiết sự cố.");
//         }

//         const issue = await response.json();

//         // Kiểm tra xem dữ liệu có hợp lệ không
//         if (!issue) {
//           alert("Không có thông tin sự cố.");
//           return;
//         }

//         // Điền dữ liệu vào modal
//         issueIdField.textContent = issue.issue_id || 'Không có';
//         locationField.textContent = issue.location || 'Không có';
//         descriptionField.textContent = issue.description || 'Không có';
//         reportDateField.textContent = issue.report_date || 'Không có';
//         statusField.textContent = issue.status || 'Không có';
//         imageField.src = issue.image || '/path/to/default-image.jpg';
//         tech.textContent = issue.tech || 'Chưa có';

//         // Hiển thị modal
//         $(modal).modal('show');
//       } catch (error) {
//         console.error("Error loading issue details:", error);
//         alert("Không thể tải chi tiết sự cố. Vui lòng thử lại sau!");
//       }
//     });
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('issueDetailModal');
  const issueIdField = document.getElementById('modalIssueId');
  const locationField = document.getElementById('modalLocation');
  const descriptionField = document.getElementById('modalDescription');
  const reportDateField = document.getElementById('modalReportDate');
  const statusField = document.getElementById('modalStatus');
  const imageField = document.getElementById('modalImage');
  const expertiseSelect = document.getElementById('modalExpertiseSelect');
  const techSelect = document.getElementById('modalTechSelect');
  const assignButton = document.getElementById('assignTechnicianButton');

  // Xử lý khi bấm vào nút "Chi tiết"
  document.querySelectorAll('.view-detail').forEach(button => {
    button.addEventListener('click', async () => {
      const issueId = button.getAttribute('data-issue-id'); // ID của sự cố
      const userId = button.getAttribute('data-user-id');

      if (!issueId) {
        alert("Dữ liệu không hợp lệ. Vui lòng thử lại!");
        return;
      }

      try {
        const response = await fetch(`/user/home/${userId}/issues/${issueId}`);
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu chi tiết sự cố.");
        }

        const issue = await response.json();

        // Điền dữ liệu vào modal
        issueIdField.textContent = issue.issue_id || 'Không có';
        locationField.textContent = issue.location || 'Không có';
        descriptionField.textContent = issue.description || 'Không có';
        reportDateField.textContent = issue.report_date || 'Không có';
        statusField.textContent = issue.status || 'Không có';
        imageField.src = issue.image || '/path/to/default-image.jpg';

        // Reset các dropdown
        expertiseSelect.value = '';
        techSelect.innerHTML = '<option value="">-- Chọn kỹ thuật viên --</option>';

        // Hiển thị modal
        $(modal).modal('show');
      } catch (error) {
        console.error("Error loading issue details:", error);
        alert("Không thể tải chi tiết sự cố. Vui lòng thử lại sau!");
      }
    });
  });

  // Xử lý khi chọn chuyên môn
  expertiseSelect.addEventListener('change', async () => {
    const expertise = expertiseSelect.value;
    if (!expertise) {
      techSelect.innerHTML = '<option value="">-- Chọn kỹ thuật viên --</option>';
      return;
    }

    try {
      // Gửi yêu cầu đến backend để lấy danh sách kỹ thuật viên theo chuyên môn
      const response = await fetch(`/admin/home/techList?expertise=${expertise}`);
      if (!response.ok) {
        throw new Error("Không thể tải danh sách kỹ thuật viên.");
      }

      const technicians = await response.json();
      console.log(technicians);

      // Cập nhật danh sách kỹ thuật viên trong select box
      techSelect.innerHTML = '<option value="">-- Chọn kỹ thuật viên --</option>';
      technicians.forEach(tech => {
        const option = document.createElement('option');
        option.value = tech.technician_id;
        option.textContent = tech.name;
        techSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error loading technicians:", error);
      alert("Không thể tải danh sách kỹ thuật viên. Vui lòng thử lại!");
    }
  });

  // Xử lý khi phân công kỹ thuật viên. Có thể gửi đi các giá trị trên req.params.
  //Lưu ý: ở đoạn code sử dụng middleware Json để gửi đi API bên backend nên cần cấu hình express.json ngoài index
  assignButton.addEventListener('click', async () => {
    const issueId = issueIdField.textContent;
    const technicianId = techSelect.value;
    console.log(issueId, technicianId);

    if (!technicianId) {
      alert("Vui lòng chọn kỹ thuật viên để phân công!");
      return;
    }

    try {
      const response = await fetch(`/admin/home/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ issue_id: issueId, technician_id: technicianId }),
      });

      if (!response.ok) {
        throw new Error("Không thể phân công kỹ thuật viên.");
      }

      alert("Phân công kỹ thuật viên thành công!");
      $(modal).modal('hide');
      location.reload(); // Làm mới danh sách
    } catch (error) {
      console.error("Error assigning technician:", error);
      alert("Không thể phân công. Vui lòng thử lại!");
    }
  });
});
