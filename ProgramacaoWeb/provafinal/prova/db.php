<?php
$host = "sql107.infinityfree.com";
$user = "if0_40413670";
$pass = "O0JzDDiKFgKDrSF";  
$db   = "if0_40413670_series_db_leonardog_mateus";

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    die("Erro na conexão: " . mysqli_connect_error());
}
?>
