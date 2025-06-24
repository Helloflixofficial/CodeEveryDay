use tracing::{ info, instrument};

fn main() {
  tracing_subscriber::fmt::init();
  hello("world".to_string());
}

#[instrument]
fn hello(s: String) {
  info!("hello {}", s)
}

// tracing = "0.1"
// tracing-subscriber = "0.3"
