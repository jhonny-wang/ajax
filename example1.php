<?php
	if(isset($_POST['yourname'])){
		echo "your name is ".$_POST['yourname']."<br>";
	}
	if(isset($_POST['website'])){
		echo "your website is ".$_POST['website']."<br>";
	}
	if(isset($_POST['password'])){
  		echo "your password is ".$_POST['password'];
	}
?>