<?php

$host = '127.0.0.1'; //You have to change this adress for your server
$db_name = 'testing'; //You have to change this to your database name
$user = 'medynd'; //Username your database
$password = 'zaq1@WSX'; //Password to your database

//Our connect
$connect = mysqli_connect($host, $user, $password, $db_name);
if( !$connect ) {
    echo 'Can not connect to database';
    exit (0);
}

//Our data with AJAX query
$name = $_POST['name'];
$tel = $_POST['tel'];
$email = $_POST['email'];
$adres = $_POST['adres'];
$f_date = $_POST['firstDate'];
$f_time = $_POST['firstTime'];
$l_date = $_POST['lastDate'];
$l_time = $_POST['lastTime'];

//Our query
$query = "INSERT INTO `car` (`id`, `name`, `tel`, `email`, `adres`, `f_date`, `f_time`, `l_date`, `l_time`) ";
$query .= "VALUES (null, '$name', '$tel', '$email', '$adres', '$f_date', '$f_time', '$l_date', '$l_time')";

$query_result = mysqli_query($connect, $query);

if (!$query_result) {
  echo("Can not add this position to database <br>");
  echo($query_result.'<br>');
  echo($query);
} else {
  echo "Succes";
}

?>