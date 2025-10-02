<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Regiões do Brasil - IBGE</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Regiões do Brasil (IBGE)</h1>

    <table>
        <tr>
            <th>ID</th>
            <th>Sigla</th>
            <th>Nome</th>
        </tr>
        <?php
        foreach ($regioes as $regiao) {
            echo "<tr>";
            echo "<td>{$regiao['id']}</td>";
            echo "<td>{$regiao['sigla']}</td>";
            echo "<td>{$regiao['nome']}</td>";
            echo "</tr>";
        }
        ?>
    </table>
</body>
</html>
