<?php
include "db.php";

$id = $_GET['id'];
$sql = "DELETE FROM series WHERE id=$id";

echo "<div style='font-family:\"Special Elite\", monospace; background-color:#4b3621; padding:30px; max-width:400px; margin:50px auto; border:2px solid #5c3a21; border-radius:6px; text-align:center; color:#f0e6d2;'>";

if (mysqli_query($conn, $sql)) {
    echo "<p style='color:#d6a75a; font-weight:bold;'>Série excluída com sucesso!</p>";
} else {
    echo "<p style='color:red; font-weight:bold;'>Erro ao excluir: " . mysqli_error($conn) . "</p>";
}

echo "<a href='index.php' style='color:#d6a75a; text-decoration:none;'>Voltar</a></div>";
?>
