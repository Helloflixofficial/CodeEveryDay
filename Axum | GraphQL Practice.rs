use async_graphql::{*, http::GraphiQLSource};
use async_graphql_axum::GraphQL;
use axum::{ response::{Html, IntoResponse}, routing::get, Router};



#[tokio::main]
async fn main() {
    let schema = Schema::build(Query, EmptyMutation, EmptySubscription).finish();

    let router = Router::new().route("/graphql", get(graphql).post_service(GraphQL::new(schema)));

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();

    axum::serve(listener, router).await.unwrap();

}

async fn graphql () -> impl IntoResponse {
    Html(GraphiQLSource::build().endpoint("/graphql").finish())
}

struct Query;

#[Object]
impl Query {
    async fn hello(&self) -> String {
        
        "hello world".to_string()
    }
}
