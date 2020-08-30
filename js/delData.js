const otable = document.querySelector("#product-table");
utils.on(otable, 'click', e => {
  const target = e.target
  if (target.innerHTML === '删除') {
    var oAlert = confirm('是否要删除')
    if (oAlert) {
      const row = target.parentNode.parentNode;
      delId = row.getAttribute('data-id');
      utils.fetch('./api/shop/del.php', { delId }).then(resp => {
        if (resp.code === 200) {
          getData()
          setTimeout(() => {
            alert('删除成功')
          }, 500);
        } else {
          alert('删除失败')
        }
      })
    }
  };
})