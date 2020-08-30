function getData() {
  //获取tbody
  const tbody = document.querySelector('.products-tbody')
  utils.fetch('./api/shop/select.php').then(resp => {
    if (resp.code === 200) {
      const { list } = resp.body
        // console.log(resp.body);
      var data = list.reduce((str, item, index) => {
          return str + `
      <tr class="text-center" data-id="${item.id}">
      <td>${index+1}</td>
      <td><span class="displayed">${item.name}</span><input type="text" class="edit input-name"></td>
      <td><span class="displayed">${item.price}</span><input type="text" class="edit input-price"></td>
      <td><span class="displayed">${item.num}</span><input type="text" class="edit input-num"></td>
      <td>
      <button class="btn btn-warning btn-xs btn-display">编辑</button>
      <button class="btn btn-danger btn-xs btn-display">删除</button>
      <button class="btn btn-danger btn-xs btn-edit">确定</button>
      <button class="btn btn-danger btn-xs btn-edit">取消</button>
      </td>
      </tr>
      `
        }, "") //把拼接好的str放到页面上
      tbody.innerHTML = data;
      // console.log('OK');
    } else {
      alert('网络异常，数据获取失败')
    }
  })
}