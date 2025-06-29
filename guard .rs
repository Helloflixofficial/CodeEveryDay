use actix_web::{  guard , web, App, HttpResponse, HttpServer, Responder};

#[actix_web::main]
async fn main() {
    HttpServer::new( move ||  {
        App::new()
            .service(
                web::scope("/api")
                    .guard(guard::Get())
                    .route("/hello", web::get().to(hello))
                    .route("/world", web::post().to(world))
            )
            
    })
        .bind("0.0.0.0:3000")
        .unwrap()
        .run()
        .await
        .unwrap()
}


async fn hello() -> impl Responder {
    HttpResponse::Ok().body(String::from("hello"))
}

async fn world() -> impl Responder {
    HttpResponse::Ok().body(String::from("world"))
}
