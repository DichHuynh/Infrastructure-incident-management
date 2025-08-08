document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('issueDetailModal');
  const issueIdField = document.getElementById('modalIssueId');
  const locationField = document.getElementById('modalLocation');
  const descriptionField = document.getElementById('modalDescription');
  const reportDateField = document.getElementById('modalReportDate');
  const statusField = document.getElementById('modalStatus');
  const imageField = document.getElementById('modalImage');
  const tech = document.getElementById('modalTech');

  document.querySelectorAll('.view-detail').forEach(button => {
    button.addEventListener('click', async () => {
      const issueId = button.getAttribute('data-issue-id'); // ID của sự cố
      const userId = button.getAttribute('data-user-id');

      if (!issueId) {
        alert("Dữ liệu không hợp lệ. Vui lòng thử lại!");
        return;
      }

      try {
        const response = await fetch(`/user/home/${userId}/issues/${issueId}`); // Đảm bảo URL chính xác
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu chi tiết sự cố.");
        }

        const issue = await response.json();

        if (!issue) {
          alert("Không có thông tin sự cố.");
          return;
        }

        // Điền dữ liệu vào modal
        issueIdField.textContent = issue.issue_id || 'Không có';
        locationField.textContent = issue.location || 'Không có';
        descriptionField.textContent = issue.description || 'Không có';
        reportDateField.textContent = issue.report_date || 'Không có';
        statusField.textContent = issue.status || 'Không có';
        imageField.src = issue.image || '/path/to/default-image.jpg';
        tech.textContent = issue.tech || 'Chưa có';

        // Hiển thị modal
        $(modal).modal('show');
      } catch (error) {
        console.error("Error loading issue details:", error);
        alert("Không thể tải chi tiết sự cố. Vui lòng thử lại sau!");
      }
    });
  });
});


