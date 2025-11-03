<?php
    require 'conexao.php';

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $codigo = (int)$_POST["codigo"];

        $sql = "DELETE FROM PESSOA WHERE CODIGO = ?";
        $stm = $conexao->prepare($sql);
        $stm->bind_param("i",$codigo);

        if($stm->execute())
            echo "Usuário ". $codigo ."excluído com sucesso";
        else
            echo "Erro ao excluir o usuário $stm->error";

        $stm->close();
        $conexao->close();
    }
?>