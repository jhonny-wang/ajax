<?php
$info = array("name"=>"复读机2","age"=>223);
$infoencode = json_encode($info);
$callback = $_GET["callback"];
echo $callback."(".$infoencode.")";//返回带有json格式数据的字符串
?>