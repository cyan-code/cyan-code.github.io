function saveCookie() {
  if ($('#save-pwd').prop('checked')) {
    $.cookie('username', $('#input-username').val(), { expires: 7, path: '/' })
    $.cookie('pwd', $('#input-password').val(), { expires: 7, path: '/' })
  } else {
    $.cookie('username', $('#input-username').val(), { path: '/' })
    $.cookie('pwd', $('#input-password').val(), { path: '/' })
  }
}