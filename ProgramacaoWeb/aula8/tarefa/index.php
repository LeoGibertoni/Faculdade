<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Estados do Brasil - IBGE</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Estados do Brasil (IBGE)</h1>

    <table>
        <tr>
            <th>ID</th>
            <th>Sigla</th>
            <th>Nome</th>
            <th>Região</th>
        </tr>
        <?php
        foreach ($estados as $estado) {
            echo "<tr>";
            echo "<td>{$estado['id']}</td>";
            echo "<td>{$estado['sigla']}</td>";
            echo "<td>{$estado['nome']}</td>";
            echo "<td>{$estado['regiao']['nome']}</td>";
            echo "</tr>";
        }
        ?>
    </table>
</body>
</html>
