use tokio::net::TcpListener;
use tokio::io::{AsyncReadExt, AsyncWriteExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let listener = TcpListener::bind("127.0.0.1:8080").await?;
    println!("🚀 Server running on 127.0.0.1:8080");
    loop {
        let (mut socket, addr) = listener.accept().await?;
        println!("📡 New client: {}", addr);
        tokio::spawn(async move {
            let mut buffer = [0u8; 1024];
            loop {
                let bytes_read = match socket.read(&mut buffer).await {
                    Ok(0) => {
                        println!("❌ Client disconnected: {}", addr);
                        return;
                    }
                    Ok(n) => n,
                    Err(e) => {
                        eprintln!("❗ Error reading from {}: {:?}", addr, e);
                        return;
                    }
                };

        
                if let Err(e) = socket.write_all(&buffer[..bytes_read]).await {
                    eprintln!("❗ Error writing to {}: {:?}", addr, e);
                    return;
                }
            }
        });
    }
}
