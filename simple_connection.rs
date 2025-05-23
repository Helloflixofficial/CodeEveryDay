use tokio::net::TcpListener;
use tokio::io::{AsyncReadExt, AsyncWriteExt};

#[tokio::main]
async fn main() {
    let listener = TcpListener::bind("127.0.0.1:8080").await.unwrap();
    println!("Server is running on 127.0.0.1:8080");

    loop {
        let (mut socket, _) = listener.accept().await.unwrap();

        tokio::spawn(async move {
            let mut buffer = [0; 1024];

          
            let n = socket.read(&mut buffer).await.unwrap();
            socket.write_all(&buffer[..n]).await.unwrap();
        });
    }
}
