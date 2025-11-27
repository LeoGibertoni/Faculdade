<?php include "db.php"; ?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Catálogo de Séries - Steampunk</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');

        body {
            font-family: 'Special Elite', monospace;
            background-color: #3c2a1f; /* tom marrom escuro */
            color: #f0e6d2;
            margin: 0;
            padding: 20px;
        }

        h1 {
            text-align: center;
            font-size: 2.5em;
            color: #d6a75a;
            text-shadow: 1px 1px #000;
        }

        a.button {
            display: inline-block;
            margin-bottom: 15px;
            padding: 12px 20px;
            background-color: #6f4e37;
            color: #f0e6d2;
            text-decoration: none;
            border-radius: 6px;
            border: 2px solid #5c3a21;
            font-weight: bold;
        }
        a.button:hover {
            background-color: #8c5e3b;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background-color: #4b3621;
            border: 2px solid #5c3a21;
            border-radius: 6px;
            overflow: hidden;
            margin-top: 10px;
        }

        th, td {
            padding: 12px;
            text-align: center;
            border-bottom: 1px solid #5c3a21;
        }

        th {
            background-color: #6f4e37;
            color: #f0e6d2;
        }

        tr:hover {
            background-color: #5c3a21;
        }

        a.action {
            color: #d6a75a;
            text-decoration: none;
            font-weight: bold;
        }
        a.action:hover {
            color: #fff;
        }

        footer {
            text-align: center;
            margin-top: 30px;
            font-size: 0.9em;
            color: #d6a75a;
        }
    </style>
</head>
<body>

<h1>Catálogo de Séries</h1>
<a href="create.php" class="button">+ Cadastrar nova série</a>

<table>
    <tr>
        <th>ID</th>
        <th>Título</th>
        <th>Gênero</th>
        <th>Plataforma</th>
        <th>Ano</th>
        <th>Ações</th>
    </tr>

<?php
$sql = "SELECT * FROM series";
$res = mysqli_query($conn, $sql);

while ($row = mysqli_fetch_assoc($res)) {
    echo "<tr>
            <td>{$row['id']}</td>
            <td>{$row['titulo']}</td>
            <td>{$row['genero']}</td>
            <td>{$row['plataforma']}</td>
            <td>{$row['ano']}</td>
            <td>
                <a href='edit.php?id={$row['id']}' class='action'>Editar</a> |
                <a href='delete.php?id={$row['id']}' class='action'>Excluir</a>
            </td>
          </tr>";
}
?>
</table>

<footer>
    &copy; 2025 Catálogo de Séries | Steampunk
</footer>

</body>
</html>
