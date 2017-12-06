const deleteTodo = (id) => {
    $.ajax({
        type: 'DELETE',
        url: '/' + id,
        success: (res) => {
            if (res.success) {
                location.reload();
                return;
            }
            alert(res.message);
        }
      });
};