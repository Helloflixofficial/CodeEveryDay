use std::io::{self, Write};

fn main() {
    // Predefined correct username and password
    let correct_username = "boby";
    let correct_password = "catgirl123";

    // Ask the user for username
    print!("Enter username: ");
    io::stdout().flush().unwrap(); // Ensure the prompt appears
    let mut username = String::new();
    io::stdin().read_line(&mut username).expect("Failed to read line");
    let username = username.trim(); // Remove newline

    // Ask the user for password
    print!("Enter password: ");
    io::stdout().flush().unwrap();
    let mut password = String::new();
    io::stdin().read_line(&mut password).expect("Failed to read line");
    let password = password.trim();

    
   
}
