<?php
//把要搜索的字符串拿到
  $str = $_GET['inputSearchValue'];
//连接数据库
  $conn = mysqli_connect('localhost','root','root','mydatabase');
  mysqli_query($conn,"set charset 'utf8'");
  mysqli_query($conn,"set character set 'utf8'");
//执行SQL语句，得到搜索结果
  $sql = "SELECT * FROM products WHERE name LIKE '%$str%'";
  $res = mysqli_query($conn,$sql);//向服务器发送请求并拿到资源数据
  $list = array();//新建一个数组，以下是把资源拼接到数组当中
  while($row = mysqli_fetch_assoc($res)){
    array_push($list,$row);
  }
  //返回resp数组，包含状态码和拼接好的数组
  $resp = array(
    "code"=>200,
    "body"=>array(
      "list"=>$list
    )
    );
echo json_encode($resp)
?>