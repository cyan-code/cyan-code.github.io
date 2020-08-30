<?php
//把前端返回的要删除的id拿到
  $delId = $_GET['delId'];
//连接数据库
  $conn = mysqli_connect('localhost','root','root','mydatabase');
  mysqli_query($conn,"set charset 'utf8'");
  mysqli_query($conn,"set character set 'utf8'");
//执行SQL语句，把删除指定id的数据
  $sql = "DELETE FROM products WHERE id = $delId";
  $result = mysqli_query($conn,$sql);
  if ($result){
    echo json_encode(array(
      "code" => 200,
      "body" => array(
        "msg"=>"success!"
      )
      ));
  }else{
    echo json_encode(array(
      "code" => 500,
      "body" => array(
        "msg"=>"failed!"
      )
      ));
  }
?>