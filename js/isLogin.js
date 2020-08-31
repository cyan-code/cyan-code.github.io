const isLogin = $.cookie('username')
console.log(isLogin);
if (!isLogin) {
  alert('请先登录');
  window.location.href = 'login.html'
}