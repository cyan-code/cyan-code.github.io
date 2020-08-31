const username = $.cookie('username'),
  pwd = $.cookie('pwd');
if (username && pwd) {
  $.ajax({
    url: 'api/shop/userFind.php',
    method: 'GET',
    data: { username, pwd },
    success: function(resp) {
      if (resp.code === 200) {
        const { list } = resp.body;
        console.log(resp);
        if (list.length != 0) {
          alert(`登录成功，欢迎回来 ${username}`);
          window.location.href = 'index.html'
        } else {
          console.log('未在cookie找到账号密码');
        }
      } else {
        console.log('网络连接失败');
      }
    },
    dataType: 'json',
  })
}
$("form").on("submit", function(event) {
  event.preventDefault();
  const userData = $(this).serialize();
  $.ajax({
    url: 'api/shop/userFind.php',
    method: 'GET',
    data: userData,
    success: function(resp) {
      if (resp.code === 200) {
        const { list } = resp.body;
        if (list.length != 0) {
          alert('登录成功!');
          saveCookie(); //保存用户名和密码到Cookie;
          window.location.href = 'index.html'
        } else {
          alert('用户名或密码错误')
        }
      } else {
        alert('网络连接失败')
      }
    },
    dataType: 'json',
  })
});