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
    $checkin = $_POST['checkin'];
    $checkout = $_POST['checkout'];

    $stmt = $conn->prepare("INSERT INTO quartos (preco, numero, tipo,  checkin, checkout, disponivel) VALUES (:preco, :numero, :tipo, :checkin, :checkout, 0)");
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

?>