$('#btn-logout').on('click', () => {
  const rmUsr = $.removeCookie('username', { path: '/' }),
    rmPwd = $.removeCookie('pwd', { path: '/' })
  if (rmUsr && rmPwd) {
    alert('注销成功')
    window.location.href = 'login.html'
  }
})