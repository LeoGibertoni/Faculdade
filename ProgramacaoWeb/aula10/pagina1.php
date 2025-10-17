<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projeto PHP com Banco</title>
</head>
<body>
    <h3>Cadastro de Pessoas</h3>
    <form method="POST" action="inserir.php">
        <label for="nome">Nome: </label>
        <input type="text" name="nome" required><br><br>
        <label for="idade">Idade: </label>
        <input type="number" name="idade" required><br><br>
        <label for="email">E-mail: </label>
        <input type="email" name="email" required><br><br>
        <button type="submit">Cadastrar</button>
    </form>
    <br>
    <button><a href="index.php" style="color: black">Voltar</a></button>
</body>
</html>