<?php
session_start();
if (!isset($_SESSION['loggedin'])) {
    header("Location: ../html/login.html");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome Page</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>
<body>
    <div class="container">
        <h2>Welcome, <?php echo htmlspecialchars($_SESSION['email']); ?>!</h2>
        <p>This is your donation website.</p>
        <a href="logout.php" class="button">Logout</a>
    </div>
</body>
</html>
