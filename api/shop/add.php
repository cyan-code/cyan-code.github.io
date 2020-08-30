<?php
//把前端返回的三个值拿到
  $name = $_GET['addName'];
  $price = $_GET['addPrice'];
  $num = $_GET['addNum'];
//连接数据库
  $conn = mysqli_connect('localhost','root','root','mydatabase');
  mysqli_query($conn,"set charset 'utf8'");
  mysqli_query($conn,"set character set 'utf8'");
//执行SQL语句，把三个值添加到表当中
  $sql = "insert into products (name,price,num) values('$name','$price','$num')";
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