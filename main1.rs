use actix_web::{web, App, HttpServer, HttpResponse, Responder, middleware::Logger};
use env_logger::Env;

mod routes;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(Env::default().default_filter_or("info"));

    println!("🚀 Starting Cloud Gaming Platform at http://127.0.0.1:8080");

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default()) 
            .configure(routes::init_routes) /
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
