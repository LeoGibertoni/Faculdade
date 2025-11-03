<?php

    require_once 'conexao.php';

    $sql = "SELECT * FROM PESSOA;";
    $resultado = $conexao->query($sql);

?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consultar</title>
</head>
<body>
    <h3>Lista de pessoas cadastradas</h3>
    <?php if($resultado->num_rows > 0) : ?>
    <table border="1" cellpading="5" cellspacing="0">
        <tr>
            <td>Código</td>
            <td>Nome</td>
            <td>Idade</td>
            <td>E-mail</td>
        </tr>
        <?php while($linha = $resultado->fetch_assoc()): ?>
        <tr>
            <td><?php echo $linha['CODIGO']; ?></td>
            <td><?php echo $linha['NOME']; ?></td>
            <td><?php echo $linha['IDADE']; ?></td>
            <td><?php echo $linha['EMAIL']; ?></td>
        </tr>
        <?php endwhile; ?>
    </table>
    <?php else: ?>
        <p>Nenhuma pessoa cadastrada</php>
    <?php endif; ?>
    <br>
    <button><a href="index.php" style="color: black">Voltar</a></button>
</body>
<?php $conexao->close(); ?>
</html>