<?php

$id = $_GET['id'];
$name = $_GET['name'];
$price = $_GET['price'];
$num = $_GET['num'];

//连接数据库
$conn = mysqli_connect('localhost','root','root','mydatabase');
mysqli_query($conn,"set charset 'utf8'");
mysqli_query($conn,"set character set 'utf8'");

//执行SQL语句，把三个值添加到表当中
$sql = "UPDATE products SET name = '$name',price =$price,num =$num WHERE id = $id";

$result = mysqli_query($conn,$sql);
if ($result){
  echo json_encode(array(
    "code" => 200,
    "body" => array(
      "msg"=>"update success!"
    )
    ));
}else{
  echo json_encode(array(
    "code" => 500,
    "body" => array(
      "msg"=>"update failed!"
    )
    ));
}

?>