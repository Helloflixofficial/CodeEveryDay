import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class JDBCExample {
    public static void main(String[] args) {
        String url = "jdbc:mysql://localhost:3306/mydatabase"; 
        String username = "root"; 
        String password = "password";

        Connection connection = null;

        try {
            // 1. Load the JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // 2. Establish a connection
            connection = DriverManager.getConnection(url, username, password);
            System.out.println("Connected to the database!");

            // INSERT Operation
            String insertSQL = "INSERT INTO students (id, name, age) VALUES (?, ?, ?)";
            PreparedStatement insertStmt = connection.prepareStatement(insertSQL);
            insertStmt.setInt(1, 1);
            insertStmt.setString(2, "Alice");
            insertStmt.setInt(3, 20);
            insertStmt.executeUpdate();
            System.out.println("Record inserted!");

            // UPDATE Operation
            String updateSQL = "UPDATE students SET age = ? WHERE id = ?";
            PreparedStatement updateStmt = connection.prepareStatement(updateSQL);
            updateStmt.setInt(1, 21); // Update age to 21
            updateStmt.setInt(2, 1); // For student with id = 1
            updateStmt.executeUpdate();
            System.out.println("Record updated!");

            // DELETE Operation
            String deleteSQL = "DELETE FROM students WHERE id = ?";
            PreparedStatement deleteStmt = connection.prepareStatement(deleteSQL);
            deleteStmt.setInt(1, 1); // Delete student with id = 1
            deleteStmt.executeUpdate();
            System.out.println("Record deleted!");

        } catch (ClassNotFoundException e) {
            System.out.println("JDBC Driver not found!");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Database error!");
            e.printStackTrace();
        } finally {
            try {
                // 5. Close the connection
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
