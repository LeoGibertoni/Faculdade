<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta de CEP</title>
</head>
<body>
    <h2>Digite um CEP para consultar:</h2>
    <form method="POST" action="resultado_cep.php">
        <label>Informe o CEP</label>
        <input type="text" name="cep" placeholder="Ex: 01001000" required><br><br>
        <button type="submit">Consultar</button>
    </form>
</body>
</html>
