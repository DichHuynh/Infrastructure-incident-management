document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('superviseDetailModal');
  const submitEvaluationButton = document.getElementById('submitEvaluationButton');

  // Lấy tất cả các nút "Chi tiết" và thêm sự kiện click
  document.querySelectorAll('.view-detail').forEach(button => {
    button.addEventListener('click', async () => {
      const issueId = button.getAttribute('data-issue-id'); // ID của sự cố
      const userId = button.getAttribute('data-user-id');
      try {
        // Lấy thông tin sự cố từ server
        const response = await fetch(`/admin/home/${userId}/${issueId}`);
        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu sự cố');
        }

        const data = await response.json();
        console.log(data.image);

        // Điền dữ liệu vào modal
        document.getElementById('modalIssueId').textContent = data.issue_id || 'Không có';
        document.getElementById('modalLocation').textContent = data.location || 'Không có';
        document.getElementById('modalDescription').textContent = data.description || 'Không có';
        document.getElementById('modalImageIssue').src = data.image || '/placeholder.jpg';
        document.getElementById('modalImage').src = data.resolved_image || '/placeholder.jpg';
        document.getElementById('modalReportDate').textContent = data.report_date || 'Không có';
        document.getElementById('modalStatus').textContent = data.status || 'Không có';
        document.getElementById('modalResponseDate').textContent = data.response_date || 'Không có';
        document.getElementById('modalReportDescription').textContent = data.report_description || '';

        // Hiển thị modal
        $(modal).modal('show');
      } catch (error) {
        console.error('Error fetching issue details:', error);
        alert('Không thể tải dữ liệu sự cố');
      }
    });
  });

  // Xử lý khi gửi đánh giá
  submitEvaluationButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const evaluation = {
      issueId: document.getElementById('modalIssueId').textContent,
      timeEvaluation: document.getElementById('timeEvaluation').value,
      qualityEvaluation: document.getElementById('qualityEvaluation').value,
      adminComments: document.getElementById('adminComments').value
    };

    try {
      // Gửi dữ liệu đánh giá qua Fetch API
      const response = await fetch('/admin/home/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(evaluation)
      });

      if (!response.ok) {
        throw new Error('Không thể gửi đánh giá');
      }

      alert('Đánh giá đã được gửi!');
      $(modal).modal('hide');
    } catch (error) {
      console.error('Error submitting evaluation:', error);
      alert('Không thể gửi đánh giá');
    }
  });
});
