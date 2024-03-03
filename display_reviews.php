<?php
// Establish database connection (replace with your database credentials)
$conn = new mysqli("localhost", "root", "123@iki", "review_system");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve reviews from the database
$sql = "SELECT * FROM reviews ORDER BY created_at DESC";
$result = $conn->query($sql);

// Display reviews
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<div class='review'>";
        echo "<strong>" . $row["username"] . "</strong> - Rating: " . $row["rating"] . "/5<br>";
        echo $row["comment"];
        echo "</div>";
    }
} else {
    echo "No reviews yet.";
}

// Close the database connection
$conn->close();
?>