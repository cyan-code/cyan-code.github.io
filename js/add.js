//选中input和保存按钮
const btnSave = document.querySelector('#btn-save'),
  inputName = document.querySelector('#product-name'),
  inputPrice = document.querySelector('#product-price'),
  inputNum = document.querySelector('#product-num');
//添加事件监听，因为在项目中，所以不使用onclick
utils.on(btnSave, 'click', function() {
    //选出所有的input值
    const addName = inputName.value,
      addPrice = inputPrice.value,
      addNum = inputNum.value;
    console.log(inputName);
    //向后端发送三个值
    utils.fetch('api/shop/add.php', { addName, addPrice, addNum }).then((resp) => {
      if (resp.code === 200) {
        setTimeout(() => {
          alert('添加成功')
          getData()
        }, 500);
      } else if (resp.code === 500) {
        alert('添加失败')
      } else {
        alert('网络异常，请重试')
      }
    });
    //执行完成，隐藏莫泰框
    $('#add-Modal').modal('hide');
  })
  //当模态框隐藏
$('#add-Modal').on('hidden.bs.modal', function() {
  inputName.value = inputPrice.value = inputNum.value = ''
})