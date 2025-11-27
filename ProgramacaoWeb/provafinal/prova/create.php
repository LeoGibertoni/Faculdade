<?php include "db.php"; ?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Cadastrar Série - Steampunk</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');

        body {
            font-family: 'Special Elite', monospace;
            background-color: #3c2a1f;
            color: #f0e6d2;
            padding: 20px;
        }

        h1 {
            text-align: center;
            font-size: 2em;
            color: #d6a75a;
            text-shadow: 1px 1px #000;
        }

        form {
            max-width: 500px;
            margin: auto;
            background-color: #4b3621;
            padding: 20px;
            border-radius: 6px;
            border: 2px solid #5c3a21;
        }

        label {
            display: block;
            margin-top: 10px;
            font-weight: bold;
            color: #d6a75a;
        }

        input[type=text], input[type=number] {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border-radius: 4px;
            border: 1px solid #6f4e37;
            background-color: #6f4e37;
            color: #f0e6d2;
        }

        button {
            margin-top: 15px;
            width: 100%;
            padding: 12px;
            background-color: #8c5e3b;
            color: #f0e6d2;
            border: 2px solid #6f4e37;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
        }
        button:hover {
            background-color: #a67c52;
        }

        a {
            display: inline-block;
            margin-top: 10px;
            color: #d6a75a;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }

        p {
            text-align: center;
            font-weight: bold;
            color: #d6a75a;
        }
    </style>
</head>
<body>

<h1>Cadastrar Série</h1>

<form method="POST">
    <label>Título:</label>
    <input type="text" name="titulo" required>

    <label>Gênero:</label>
    <input type="text" name="genero" required>

    <label>Plataforma:</label>
    <input type="text" name="plataforma" required>

    <label>Ano:</label>
    <input type="number" name="ano" required>

    <button type="submit">Salvar</button>
</form>

<?php
if ($_POST) {
    $titulo = $_POST['titulo'];
    $genero = $_POST['genero'];
    $plataforma = $_POST['plataforma'];
    $ano = $_POST['ano'];

    $sql = "INSERT INTO series (titulo, genero, plataforma, ano)
            VALUES ('$titulo', '$genero', '$plataforma', $ano)";

    if (mysqli_query($conn, $sql)) {
        echo "<p>Série cadastrada com sucesso!</p>";
    } else {
        echo "<p>Erro: " . mysqli_error($conn) . "</p>";
    }

    echo "<a href='index.php'>Voltar</a>";
}
?>
</body>
</html>
