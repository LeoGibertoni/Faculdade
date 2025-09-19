<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Pública - POST</title>
</head>
<body>
    <h3>Exemplo de envio de dados</h3>
    <form method="POST" action="pagina2.php">
        <label for="id">Id: </label>
        <input type="text" name="id" id="id" required><br><br>

        <label for="title">Título: </label>
        <input type="text" name="title" id="title" required><br><br>

        <label for="body">Postagem: </label>
        <textarea name="body" id="body" required></textarea><br><br>

        <label for="userId">ID Usuário: </label>
        <input type="text" name="userId" id="userId" required><br><br>

        <button type="submit">Enviar</button>
    </form>
</body>
</html>
