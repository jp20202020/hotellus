<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type'); // 1

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

include 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->prepare("SELECT * FROM quartos");
    $stmt -> execute();
    $quartos = $stmt ->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($quartos);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {//metodo para fazer uma reserva
    $preco = $_POST['preco'];
    $numero = $_POST['numero'];
    $tipo = $_POST['tipo'];
    $disp_quarto = $_POST['disponivel'];
    $checkin = $_POST['checkin'];
    $checkout = $_POST['checkout'];

    $stmt = $conn->prepare("INSERT INTO quartos (preco, numero, tipo, checkin, checkout , disponivel) VALUES (:preco, :numero, :tipo, :checkin, :checkout, 0)");
    $stmt -> bindParam(':preco', $preco);
    $stmt -> bindParam(':numero', $numero);
    $stmt -> bindParam(':tipo', $tipo);
    $stmt -> bindParam(':checkin', $checkin);
    $stmt -> bindParam(':checkout', $checkout);

    if ($stmt->execute()){
        echo "reserva realizada com sucesso";
    } else {
        echo "erro ao realizar reserva";
    }

}

//rotas para atualizar livros

if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset ($_GET['id'])) {
    
    //convertando dados
    parse_str(file_get_contents("php://input"), $_PUT);

    $id = $_GET['id'];
    $novopreco = $_PUT['preco'];
    $novoNumero = $_PUT['numero'];
    $novoTipo = $_PUT['tipo'];
    $novoDisponivel = $_PUT['disponivel'];
    $novoCheckin = $_PUT['checkin'];
    $novoCheckout = $_PUT['checkout'];

    $stmt = $conn->prepare("UPDATE quartos SET preco = :preco, numero = :numero, tipo = :tipo, checkin = :checkin, checkout = :checkout,  disponivel = :disponivel WHERE id = :id");
    $stmt->bindParam(':preco', $novopreco);
    $stmt->bindParam(':numero', $novoNumero);
    $stmt->bindParam(':tipo', $novoTipo);
    $stmt->bindParam(':disponivel', $novoDisponivel);
    $stmt->bindParam(':checkin', $novoCheckin);
    $stmt->bindParam(':checkout', $novoCheckout);
    $stmt->bindParam(':id', $id);

    if ($stmt->execute()) {
        echo "quarto atualizado com sucesso";
    } else {
        echo "erro ao atualizar :(";
    }

}

//rota para deletar

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['id'])) {
    $id = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM quartos WHERE id = :id");
    $stmt->bindParam(':id', $id);

    if ($stmt->execute()) {
        echo "reserva excluida com sucesso";
    } else {
        echo "erro ao excluir :(";
    }
}





//  100 
// 200 - ok
// 300 - mudança de pagina
// 400 - erro de pagina
// 500 - erro de programação

// PUT - UTILIZA PARA ATUALIZAR
// DELETE - UTILIZA PARA DELETAR
// OPTIONS -
// 1 - permite com que qualquer header consiga acessar o sistema



?>