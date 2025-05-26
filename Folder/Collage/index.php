<?php
//old method but still use full in php and rust.
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "my_database";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// Handle form submission for inserting new data
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['submit'])) {
    // Sanitize input data for security
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    
    // Insert data into the database
    $sql = "INSERT INTO users (name, email) VALUES ('$name', '$email')";
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully<br><br>";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Handle data editing from the edit form
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['update'])) {
    // Sanitize input data for security
    $id = intval($_POST['id']); // Sanitize ID to prevent SQL injection
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    
    // Update the record in the database
    $sql = "UPDATE users SET name='$name', email='$email' WHERE id=$id";
    if ($conn->query($sql) === TRUE) {
        echo "Record updated successfully<br><br>";
    } else {
        echo "Error: " . $conn->error;
    }
}

// Fetch all users data from the database for display or editing
$sql = "SELECT id, name, email FROM users";
$result = $conn->query($sql);

// Check if records are found
if ($result->num_rows > 0) {
    echo "<h2>User List</h2>";
    while ($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id"] . " - Name: " . $row["name"] . " - Email: " . $row["email"];
        echo " <a href='?edit=" . $row["id"] . "'>Edit</a><br>";
    }
} else {
    echo "No records found.<br><br>";
}


if (isset($_GET['edit'])) {
    $id = intval($_GET['edit']);  
    $sql = "SELECT * FROM users WHERE id = $id";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();

    if ($row) {
        echo "Editing User ID: " . $row['id'] . "<br>";
        echo "Name: " . $row['name'] . "<br>";
        echo "Email: " . $row['email'] . "<br><br>";
    } else {
        echo "User not found for editing.<br><br>";
    }
}

$conn->close();
?>
