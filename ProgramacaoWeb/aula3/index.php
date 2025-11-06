<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_POST["cor"])) {
            setcookie("cor", $_POST["cor"], time() + 3600); 
            header("Location: index.php");
            exit;
        }
    }

    $cor_fundo = isset($_COOKIE["cor"]) ? $_COOKIE["cor"] : "#FFFFFF";
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Personalizar com Cookie</title>
</head>
<body style="background-color: <?php echo $cor_fundo; ?>;">
    <h2>Escolha a cor de fundo:</h2>
    <form method="POST" action="">
        <input type="color" name="cor" value="<?php echo htmlspecialchars($cor_fundo); ?>">
        <button type="submit">Salvar</button>
    </form>

    <form action="restaurar.php" method="post" style="margin-top: 10px;">
        <button type="submit">Restaurar</button>
    </form>
</body>
</html>
