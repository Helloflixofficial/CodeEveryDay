// brew install redis

// redis-server







use redis::AsyncCommands;

#[tokio::main]
async fn main() {
    let client = redis::Client::open("redis://localhost:6379").unwrap();

    let mut connection = client.get_multiplexed_async_connection().await.unwrap();

    let _ : () = connection.set("message", "hello world").await.unwrap();
    
    let msg: String = connection.get("message").await.unwrap();
    println!("{}", msg); // hello world

}







// [dependencies]
// redis = { version = "0.29.1", features = ["tokio-comp"] }
// tokio = { version = "1.42.0", features = ["full"] }
