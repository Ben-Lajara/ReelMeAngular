<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$host = 'localhost';
$db   = 'pruebareelme';
$user = 'root';
$pass = '';
$charset = 'utf8';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
$pdo = new PDO($dsn, $user, $pass, $opt);

$data = json_decode(file_get_contents('php://input'), true);
error_log(print_r($data, true));

$nombre = isset($data['nombre']) ? $data['nombre'] : null;
$pword = isset($data['pword']) ? $data['pword'] : null;
$action = isset($data['action']) ? $data['action'] : null;

// Check if this is a registration request
if ($action === 'register') {
    $sql = "INSERT INTO usuario (nombre, pword) VALUES (?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nombre, $pword]);
    echo json_encode(['status' => 'success']);
}
// Check if this is a login request
else if ($action === 'login') {
    $sql = "SELECT * FROM usuario WHERE nombre = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nombre]);
    $user = $stmt->fetch();

    if ($user && $pword === $user['pword']) {
        $token = bin2hex(random_bytes(16)); // generate an authentication token
        echo json_encode(['status' => 'success', 'token' => $token]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
    }
} else if ($action === 'review') {
    $fecha = isset($data['fecha']) ? $data['fecha'] : null;
    $calificacion = isset($data['calificacion']) ? $data['calificacion'] : null;
    $comentario = isset($data['comentario']) ? $data['comentario'] : null;
    $gustado = isset($data['gustado']) ? $data['gustado'] : null;
    $id_pelicula = isset($data['id_pelicula']) ? $data['id_pelicula'] : null;
    $usuario = isset($data['usuario']) ? $data['usuario'] : null;


    $sql = "INSERT INTO resena (fecha, calificacion, comentario, gustado, id_pelicula, usuario) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    try {
        $stmt->execute([$fecha, $calificacion, $comentario, $gustado, $id_pelicula, $usuario]);
        echo json_encode(['status' => 'success']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }

    $id = isset($data['id_pelicula']) ? $data['id_pelicula'] : null;
    $titulo = isset($data['titulo']) ? $data['titulo'] : null;
    $year = isset($data['year']) ? $data['year'] : null;
    $foto = isset($data['foto']) ? $data['foto'] : null;
    $sql = "INSERT INTO pelicula(id, titulo, year, foto) VALUES (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    try {
        $stmt->execute([$id, $titulo, $year, $foto]);
        echo json_encode(['status' => 'success']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
} else if ($data['action'] === 'diario') {
    $usuario = isset($data['usuario']) ? $data['usuario'] : null;
    $stmt = $pdo->prepare('SELECT * FROM resena WHERE usuario = ?');
    $stmt->execute([$usuario]);
    $reviews = $stmt->fetchAll();
    echo json_encode($reviews);
} else if ($data['action'] === 'buscarID') {
    $id = isset($data['id']) ? $data['id'] : null;
    $stmt = $pdo->prepare('SELECT * FROM pelicula WHERE id = ?');
    $stmt->execute([$id]);
    $pelicula = $stmt->fetch();
    echo json_encode($pelicula);
} else if ($data['action'] === 'getReview') {
    $usuario = isset($data['usuario']) ? $data['usuario'] : null;
    $id_pelicula = isset($data['id_pelicula']) ? $data['id_pelicula'] : null;
    $stmt = $pdo->prepare('SELECT * FROM resena WHERE usuario = ? and id_pelicula = ?');
    $stmt->execute([$usuario, $id_pelicula]);
    $review = $stmt->fetch();
    echo json_encode($review);
} else if ($data['action'] === 'editReview') {
    $fecha = isset($data['fecha']) ? $data['fecha'] : null;
    $calificacion = isset($data['calificacion']) ? $data['calificacion'] : null;
    $comentario = isset($data['comentario']) ? $data['comentario'] : null;
    $gustado = isset($data['gustado']) ? $data['gustado'] : null;
    $id_pelicula = isset($data['id_pelicula']) ? $data['id_pelicula'] : null;
    $usuario = isset($data['usuario']) ? $data['usuario'] : null;


    $sql = "UPDATE resena SET fecha=?, calificacion=?, comentario=?, gustado=? WHERE id_pelicula=? AND usuario=?";
    $stmt = $pdo->prepare($sql);
    try {
        $stmt->execute([$fecha, $calificacion, $comentario, $gustado, $id_pelicula, $usuario]);
        echo json_encode(['status' => 'success']);
    } catch (PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
} else if ($data['action'] === 'getSeguidos') {
    $nombre = isset($data['nombre']) ? $data['nombre'] : null;

    $stmt = $pdo->prepare('SELECT r.*, p.*, us.usuario_seguido FROM usuario u 
			JOIN usuarios_seguidos us ON us.usuario_seguido = u.nombre
			JOIN resena r ON r.usuario = u.nombre
			JOIN pelicula p ON p.id = r.id_pelicula
			WHERE us.nombre_usuario = ?
			GROUP BY us.usuario_seguido
			ORDER BY r.fecha');
    $stmt->execute([$nombre]);
    $seguidos = $stmt->fetchAll();
    echo json_encode($seguidos);
} else if ($data['action'] === 'getLastReview') {
    $nombre = isset($data['nombre']) ? $data['nombre'] : null;

    $stmt = $pdo->prepare('SELECT * FROM resena WHERE usuario = ? ORDER BY fecha DESC LIMIT 1');
    $stmt->execute([$id]);
    $resena = $stmt->fetch();
    echo json_encode($resena);
} else if ($data['action'] === 'getReviewPublica') {
    $usuario = isset($data['usuario']) ? $data['usuario'] : null;
    $id_pelicula = isset($data['id_pelicula']) ? $data['id_pelicula'] : null;
    $stmt = $pdo->prepare('SELECT r.*, u.nombre, p.* FROM usuario u
							JOIN resena r ON r.usuario = u.nombre
							JOIN pelicula p ON p.id = r.id_pelicula
							WHERE r.usuario = ? AND r.id_pelicula = ?');
    $stmt->execute([$usuario, $id_pelicula]);
    $resena = $stmt->fetch();
    echo json_encode($resena);
} else if ($data['action'] === 'getReviewsPelicula') {
    $id_pelicula = isset($data['id_pelicula']) ? $data['id_pelicula'] : null;
    $stmt = $pdo->prepare('SELECT * FROM resena WHERE id_pelicula = ?');
    $stmt->execute([$id_pelicula]);
    $resenas = $stmt->fetchAll();
    echo json_encode($resenas);
} else if ($data['action'] === 'getUserData') {
    $nombre = isset($data['nombre']) ? $data['nombre'] : null;
    $stmt = $pdo->prepare('SELECT u.nombre, COUNT(r.fecha) as vistas FROM usuario u JOIN resena r ON r.usuario = u.nombre WHERE u.nombre = ? ');
    $stmt->execute([$nombre]);
    $datos = $stmt->fetch();
    echo json_encode($datos);
} else if ($data['action'] === 'getSeguidores') {
    $usuario_seguido = isset($data['usuario_seguido']) ? $data['usuario_seguido'] : null;
    $stmt = $pdo->prepare('SELECT nombre_usuario as seguidor FROM usuarios_seguidos WHERE usuario_seguido = ?');
    $stmt->execute([$usuario_seguido]);
    $seguidores = $stmt->fetchAll();
    echo json_encode($seguidores);
} else if ($data['action'] === 'getSeguidos') {
    $nombre_usuario = isset($data['nombre_usuario']) ? $data['nombre_usuario'] : null;
    $stmt = $pdo->prepare('SELECT usuario_seguido as siguiendo FROM usuarios_seguidos WHERE nombre_usuario = ?');
    $stmt->execute([$nombre_usuario]);
    $seguidos = $stmt->fetchAll();
    echo json_encode($seguidos);
}
