document.addEventListener('DOMContentLoaded', () => {
  // Xử lý xóa công việc
  document.querySelectorAll('[button-delete]').forEach(button => {
    button.addEventListener('click', async () => {
      const taskId = button.getAttribute('data-task-id');
      const confirmation = confirm('Bạn có chắc chắn muốn xóa công việc này?');
      if (!confirmation) return;

      const response = await fetch(`/tech/home/delete-task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ taskId })
      });

      const result = await response.json();
      if (result.success) {
        alert('Xóa thành công!');
        window.location.reload();
      } else {
        alert('Có lỗi xảy ra khi xóa!');
      }
    });
  });
});
