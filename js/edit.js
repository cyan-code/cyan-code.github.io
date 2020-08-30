//编辑
utils.on(otable, 'click', e => {
  const target = e.target,
    tr = target.parentNode.parentNode
  if (target.innerHTML === '编辑') {
    tr.classList.add('edit')
    const spans = tr.querySelectorAll('span');
    spans.forEach(span => {
      span.nextElementSibling.value = span.innerHTML
    })
  } else if (target.innerHTML === '确定') {
    const name = tr.querySelector('.input-name').value,
      price = tr.querySelector('.input-price').value,
      num = tr.querySelector('.input-num').value,
      id = tr.getAttribute('data-id');
    //向后端发送请求
    utils.fetch('api/shop/edit.php', { name, price, num, id }).then((resp) => {
      if (resp.code == 200) {
        tr.classList.remove('edit')
        const spans = tr.querySelectorAll('span');
        spans.forEach(span => {
          span.innerHTML = span.nextElementSibling.value
        })
      } else {
        alert('更改失败！！！')
      }
    })
  }
})