<?php
    setcookie("cor", "", time() - 3600); // Expira o cookie
    header("Location: index.php");
    exit();
?>
