// src/main.rs
fn main() {
    // String owns its heap allocation
    let s1 = String::from("hello");
    // Move ownership from s1 to s2
    let s2 = s1;
    // println!("{}", s1); // ERROR: use of moved value `s1`
    println!("s2: {}", s2);

    // Clone to make a deep copy
    let s3 = s2.clone();
    println!("s2: {}, s3: {}", s2, s3);

    // Simple stack copy (Copy trait)
    let x = 5;
    let y = x; // x still usable because i32: Copy
    println!("x: {}, y: {}", x, y);
}
