fn main() {
    let a: Option<i32> = None;
    let Some(x) = a else {
        println!("Hello from else");
        return;
    };
    println!("hello sire");
    println!(" value in a :  {} ", x);
}
fn main() {
    let a = Some(1);;
    let Some(x) = a else {
        println!("Hello from else");
        return;
    };
    println!("hello sire");
    println!(" value in a :  {} ", x);
}
